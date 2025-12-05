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
      
      // Handle the response structure safely
      const eventList = data.events || data || [];
      
      if (Array.isArray(eventList)) {
        setEvents(eventList);
      } else {
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

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await apiClient(`/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete");
      setEvents(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      alert(err.message);
    }
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
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>
                  {/* FIX 1: Use 'images' array (images[0].url) instead of 'image' string */}
                  <img 
                    src={event.images?.[0]?.url || 'https://placehold.co/100x50?text=No+Image'} 
                    alt={event.title?.en || 'Event'} 
                    width="100" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x50?text=No+Image'; }}
                  />
                </td>
                
                {/* FIX 2: Render specific language string, NOT the whole object */}
                <td>
                    {event.title?.en || event.title?.mr || 'Untitled'}
                </td>
                
                {/* FIX 3: Use 'eventDate' (from DB), not 'date' */}
                <td>{formatDate(event.eventDate)}</td>
                
                {/* FIX 4: Render specific language string for location */}
                <td>
                    {event.location?.en || event.location?.mr || 'No Location'}
                </td>
                
                <td>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
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