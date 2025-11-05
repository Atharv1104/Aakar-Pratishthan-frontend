import 'react-photo-view/dist/react-photo-view.css';
import styles from "../../../CSS/Programs/programepage.module.css";
import { useTranslation } from 'react-i18next';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import React, { useState, useEffect } from 'react'; // Import React hooks

export default function Programs() {
    const { t } = useTranslation('common');
    
    // --- 1. Add state for events and loading ---
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- 2. Add useEffect to fetch data on component mount ---
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                // This matches your backend GET route
                const response = await fetch('/api/events'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data); // Set the array of event objects
            } catch (error) {
                console.error(error);
                setEvents([]); // Set to empty array on error
            }
            setLoading(false);
        };

        fetchEvents();
    }, []); // Empty array means this runs once

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headers}>
                    <h2>{t('programs.title')} </h2>
                    <h5>{t('programs.subtitle')}</h5>
                </div>

                <PhotoProvider>
                    <div className={styles.cardcontainer}>
                        {/* --- 3. Handle Loading and Empty States --- */}
                        {loading ? (
                            <p>Loading programs...</p> 
                        ) : events.length === 0 ? (
                            <p>No programs or events have been posted yet. Check back soon!</p>
                        ) : (
                            // --- 4. Map over the live 'events' data ---
                            events.map((event) => (
                                <div className={styles.card} key={event._id}>
                                    {/* Use the *first* image from the images array */}
                                    <PhotoView src={event.images[0]?.url || 'https://placehold.co/600x400/E2E8F0/475569?text=Event'}>
                                        <img 
                                            src={event.images[0]?.url || 'https://placehold.co/600x400/E2E8F0/475569?text=Event'} 
                                            alt={event.title} 
                                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E2E8F0/475569?text=Image+Error'; }}
                                        />
                                    </PhotoView>
                                    
                                    {/* --- 5. Use dynamic data from the event object --- */}
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                    
                                    <div className={styles.eventDetails}>
                                        <span><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</span>
                                        <span><strong>Location:</strong> {event.location}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </PhotoProvider>
            </div>
        </>
    );
}
