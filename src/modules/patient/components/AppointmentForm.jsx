import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Clipboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { bookAppointment } from '../services/patientApi';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51QTfJwAye9K1YIX9aRhrEifxBRrB7iDj860ufNrpyYc2S7iRsABG4Uwj2L1Oj75vTVuBt0erPxOHgb9MAI4MSWMs00Vv0OZOgJ');

const CheckoutForm = ({ clientSecret, appointmentId, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !appointmentId) {
            console.error('Missing required data:', { stripe: !!stripe, elements: !!elements, appointmentId });
            setError('Missing required payment information');
            return;
        }

        setProcessing(true);

        try {
            const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/patient/appointments`,
                },
                redirect: 'if_required'
            });

            if (paymentError) {
                console.error('Payment error:', paymentError);
                setError(paymentError.message);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded, updating appointment:', appointmentId);
                try {
                    const response = await api.post(`/patient/appointments/${appointmentId}/payment`, {
                        paymentIntentId: paymentIntent.id,
                        status: paymentIntent.status
                    });
                    
                    console.log('Payment status update response:', response.data);
                    onSuccess();
                } catch (updateError) {
                    console.error('Error updating payment status:', updateError);
                    // Even if the status update fails, the payment was successful
                    // You might want to implement a retry mechanism here
                    onSuccess();
                }
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="mt-4 w-full px-6 py-2 bg-primary text-white rounded-md"
            >
                {processing ? 'Processing...' : 'Pay now'}
            </button>
        </form>
    );
};

const AppointmentForm = ({ doctor }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [issues, setIssues] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [appointmentId, setAppointmentId] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const dateTime = new Date(`${date}T${time}`);
            const response = await bookAppointment(doctor._id, {
                dateTime,
                issues
            });

            if (response.appointment && response.clientSecret) {
                console.log('Appointment created:', response.appointment._id);
                setAppointmentId(response.appointment._id);
                setClientSecret(response.clientSecret);
                setShowPayment(true);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Booking error:', err);
            setError(err.message || 'Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        navigate('/patient/appointments');
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
        >
        <h2 className="text-2xl font-bold mb-4">Book Appointment with Dr. {doctor.name}</h2>
      
        {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
            </div>
        )}

      {!showPayment ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issues/Symptoms
            </label>
            <textarea
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-6 py-2 bg-primary text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </motion.button>
        </form>
      ) : (
        <div className="mt-4">
            <Elements
                stripe={stripePromise}
                options={{
                    clientSecret,
                    appearance: {
                        theme: 'stripe'
                    }
                }}
            >
                <CheckoutForm
                    clientSecret={clientSecret}
                    appointmentId={appointmentId}
                    onSuccess={handlePaymentSuccess}
                />
            </Elements>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentForm;