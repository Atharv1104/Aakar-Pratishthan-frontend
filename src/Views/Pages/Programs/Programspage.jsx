// import 'react-photo-view/dist/react-photo-view.css';
// import styles from "../../../CSS/Programs/programepage.module.css";
// import { useTranslation } from 'react-i18next';
// import { PhotoProvider, PhotoView } from 'react-photo-view';
// import React, { useState, useEffect } from 'react'; // Import React hooks

// export default function Programs() {
//     const { t } = useTranslation('common');
    
//     // --- 1. Add state for events and loading ---
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // --- 2. Add useEffect to fetch data on component mount ---
//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 setLoading(true);
//                 // This matches your backend GET route
//                 const response = await fetch('/api/events'); 
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch events');
//                 }
//                 const data = await response.json();
//                 setEvents(data); // Set the array of event objects
//             } catch (error) {
//                 console.error(error);
//                 setEvents([]); // Set to empty array on error
//             }
//             setLoading(false);
//         };

//         fetchEvents();
//     }, []); // Empty array means this runs once

//     return (
//         <>
//             <div className={styles.container}>
//                 <div className={styles.headers}>
//                     <h2>{t('programs.title')} </h2>
//                     <h5>{t('programs.subtitle')}</h5>
//                 </div>

//                 <PhotoProvider>
//                     <div className={styles.cardcontainer}>
//                         {/* --- 3. Handle Loading and Empty States --- */}
//                         {loading ? (
//                             <p>Loading programs...</p> 
//                         ) : events.length === 0 ? (
//                             <p>No programs or events have been posted yet. Check back soon!</p>
//                         ) : (
//                             // --- 4. Map over the live 'events' data ---
//                             events.map((event) => (
//                                 <div className={styles.card} key={event._id}>
//                                     {/* Use the *first* image from the images array */}
//                                     <PhotoView src={event.images[0]?.url || 'https://placehold.co/600x400/E2E8F0/475569?text=Event'}>
//                                         <img 
//                                             src={event.images[0]?.url || 'https://placehold.co/600x400/E2E8F0/475569?text=Event'} 
//                                             alt={event.title} 
//                                             onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E2E8F0/475569?text=Image+Error'; }}
//                                         />
//                                     </PhotoView>
                                    
//                                     {/* --- 5. Use dynamic data from the event object --- */}
//                                     <h3>{event.title}</h3>
//                                     <p>{event.description}</p>
                                    
//                                     <div className={styles.eventDetails}>
//                                         <span><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</span>
//                                         <span><strong>Location:</strong> {event.location}</span>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </PhotoProvider>
//             </div>
//         </>
//     );
// }


// src/Views/Pages/Programs/Programspage.jsx (REPLACE ALL)

import 'react-photo-view/dist/react-photo-view.css';
import styles from "../../../CSS/Programs/programepage.module.css";
import { useTranslation } from 'react-i18next';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import React, { useState, useEffect } from 'react';
import apiClient from '../../../utils/apiClients.js';

export default function Programs() {
    const { t } = useTranslation('common');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // BUG 1 FIX: Define an async function *inside* useEffect
        const fetchEvents = async () => {
            try {
                const response = await apiClient("/events"); // This URL is correct
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Successfully fetched events data:", data);
                setEvents(data);
            } catch (err) {
                console.error("Error fetching events:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // BUG 2 FIX: Call the async function
        fetchEvents();
    
    // Add the empty dependency array
    }, []); 

    const getBilingualText = (field) => {
        if (!field) return "";
        return field.mr || field.en;
    };

    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <h2>{t('programs.title')}</h2>
                <h5>{t('programs.subtitle')}</h5>
            </div>
            <PhotoProvider>
                <div className={styles.cardcontainer}>
                    {loading && <p>Loading programs...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && events.length === 0 && <p>No programs posted yet.</p>}
                    {!loading && !error && events.map((event) => (
                        <div className={styles.card} key={event._id}>
                            <PhotoView src={event.images[0]?.url}>
                                <img src={event.images[0]?.url || 'https://placehold.co/600x400'} alt={getBilingualText(event.title)} />
                            </PhotoView>
                            <h3>{getBilingualText(event.title)}</h3>
                            <p>{getBilingualText(event.description)}</p>
                            <div className={styles.eventDetails}>
                                <span><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</span>
                                <span><strong>Location:</strong> {getBilingualText(event.location)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </PhotoProvider>
        </div>
    );
}