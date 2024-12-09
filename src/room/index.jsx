import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { appointmentId } = useParams();
    const [error, setError] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const zegoInstance = useRef(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLeaveCall = async () => {
        try {
            if (zegoInstance.current) {
                // Destroy the instance which cleans up resources
                await zegoInstance.current.destroy();
                zegoInstance.current = null;
            }
            setIsInitialized(false);
            navigate(-1);
        } catch (error) {
            console.error('Error leaving call:', error);
        }
    };

    const myMeeting = async (element) => {
        if (!element || isInitialized) return;
        
        try {
            const appID = 1553050581;
            const serverSecret = "50833ced4a065268b0946f545008cf8b";

            if (!appID || !serverSecret) {
                throw new Error('ZegoCloud credentials are not configured');
            }

            const roomID = `appointment-${appointmentId}`;

            const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                user?.id || Date.now().toString(),
                user?.name || 'Guest'
            );

            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zegoInstance.current = zc;
            
            zc.joinRoom({
                container: element,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showPreJoinView: true,
                showScreenSharingButton: true,
                showUserList: false,
                showRoomTimer: true,
                maxUsers: 2,
                layout: "Auto",
                showLayoutButton: false,
                onUserLeave: handleLeaveCall,
                onJoinRoom: () => {
                    console.log("Joined room:", roomID);
                    setIsInitialized(true);
                },
                onError: (error) => {
                    console.error("Video call error:", error);
                    setError("Failed to connect to video call");
                },
                sharedLinks: [],
            });

        } catch (error) {
            console.error("Error setting up video call:", error);
            setError(error.message || "Failed to initialize video call");
        }
    };

    useEffect(() => {
        if (!appointmentId) {
            setError('Invalid appointment');
            return;
        }

        // Cleanup function
        return () => {
            if (zegoInstance.current) {
                zegoInstance.current.destroy();
                zegoInstance.current = null;
            }
            setIsInitialized(false);
        };
    }, [appointmentId]);

    return (
        <div className="h-screen">
            {error && (
                <div className="p-4 bg-red-100 text-red-700 mb-4">
                    {error}
                </div>
            )}
            <div ref={myMeeting} className="h-full" />
        </div>
    );
};

export default RoomPage;