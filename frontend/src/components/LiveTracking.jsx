import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const defaultCenter = {
    lat: 28.6139, // Default to Delhi coordinates
    lng: 77.2090
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;

    useEffect(() => {
        // Function to handle successful position updates
        const handlePositionSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
            setError(null);
            setRetryCount(0); // Reset retry count on success
        };

        // Function to handle position errors
        const handlePositionError = (error) => {
            console.error('Error getting location:', error);
            
            if (retryCount < MAX_RETRIES) {
                setRetryCount(prev => prev + 1);
                // Retry after a delay
                setTimeout(() => {
                    navigator.geolocation.getCurrentPosition(
                        handlePositionSuccess,
                        handlePositionError,
                        {
                            enableHighAccuracy: true,
                            timeout: 10000, // Increased timeout
                            maximumAge: 0
                        }
                    );
                }, 1000 * (retryCount + 1)); // Exponential backoff
            } else {
                setError('Unable to get your location. Please check your location settings and try again.');
            }
        };

        // Get initial position
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                handlePositionSuccess,
                handlePositionError,
                {
                    enableHighAccuracy: true,
                    timeout: 10000, // Increased timeout
                    maximumAge: 0
                }
            );

            // Set up continuous tracking with longer interval
            const watchId = navigator.geolocation.watchPosition(
                handlePositionSuccess,
                handlePositionError,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );

            // Cleanup function
            return () => {
                if (watchId) {
                    navigator.geolocation.clearWatch(watchId);
                }
            };
        } else {
            setError('Geolocation is not supported by your browser');
        }
    }, [retryCount]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
            {error && (
                <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded">
                    {error}
                </div>
            )}
        </LoadScript>
    )
}

export default LiveTracking