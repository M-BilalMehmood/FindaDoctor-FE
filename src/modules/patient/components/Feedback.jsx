import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Feedback = ({ appointment, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit({ doctorId: appointment.doctor._id, appointmentId: appointment._id, rating, comment });
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!appointment || !appointment.doctor) {
        return <div>No appointment selected.</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Provide Feedback</h2>
            <p className="mb-4">Appointment with Dr. {appointment.doctor.name} on {new Date(appointment.dateTime).toLocaleString()}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                    </label>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                                key={star}
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setRating(star)}
                                className={`mr-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                                <Star className="w-8 h-8 fill-current" />
                            </motion.button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                    ></textarea>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </motion.button>
            </form>
        </div>
    );
};

export default Feedback;