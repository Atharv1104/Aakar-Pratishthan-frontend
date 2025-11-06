import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../../utils/apiClients';
import AddEvent from '../Forms/addEvents';
import styles from '../../CSS/Admin/adminpage.module.css'; // Assuming you use this

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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient('/events');
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function won't change

  // 2. useEffect now just calls fetchEvents once on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // Add fetchEvents as a dependency

  // 3. THIS IS THE BIG FIX:
  // This function is passed to the modal. It no longer expects
  // a 'newEvent' object. It just closes the modal and
  // re-fetches the entire list from the server.
  const handleEventAdded = () => {
    setShowAddModal(false); // Close the modal
    fetchEvents(); // Re-fetch all events to get the new one
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
          {events.map((event) => (
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
          ))}
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