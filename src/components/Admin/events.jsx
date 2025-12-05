import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../../utils/apiClients';
import AddEvent from '../Forms/addEvents';
import styles from '../../CSS/Admin/adminpage.module.css';

// Helper function to format date safely
const formatDate = (dateString) => {
  if (!dateString) return 'No Date';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (err) {
    console.error('Invalid date:', dateString, err);
    return 'Invalid Date';
  }
};

const Events = () => {
  const [events, setEvents] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      // FIX 1: Use '/events', not '/api/events'
      const res = await apiClient('/events');
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      
      // FIX 2: Handle the response structure safely.
      // If backend returns { events: [...] }, use data.events.
      // If backend returns [...], use data.
      const eventList = data.events || data || [];
      
      if (Array.isArray(eventList)) {
        setEvents(eventList);
      } else {
        console.error("API did not return an array:", data);
        setEvents([]); 
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventAdded = () => {
    setShowAddModal(false); 
    fetchEvents(); 
  };

  const openModal = () => setShowAddModal(true);
  const closeModal = () => setShowAddModal(false);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.content}>
      <h2>Manage Events</h2>
      <button onClick={openModal} className={styles.addButton}>Add New Event</button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* FIX 3: Add a check to ensure events is an array before mapping */}
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>
                  <img 
                    src={event.image || 'https://placehold.co/100x50?text=No+Image'} 
                    alt={event.title} 
                    width="100" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x50?text=No+Image'; }}
                  />
                </td>
                <td>{event.title}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.location}</td>
                <td>
                  <button className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{textAlign: 'center'}}>No events found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>
            <AddEvent onEventAdded={handleEventAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;