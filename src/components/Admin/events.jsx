import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../../utils/apiClients';
import AddEvent from '../Forms/addEvents';
import styles from '../../CSS/Admin/adminpage.module.css';

// Helper function to format date safely
const formatDate = (dateString) => {
  if (!dateString) return 'No Date';
  try {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch (err) {
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

  // --- INLINE STYLES FOR CARD LAYOUT ---
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Responsive grid
    gap: '20px',
    marginTop: '20px'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
  };

  const imageContainerStyle = {
    width: '100%',
    height: '180px',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const contentStyle = {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  };

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333'
  };

  const infoStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '5px'
  };

  const deleteBtnStyle = {
    marginTop: 'auto',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  };

  return (
    <div className={styles.content}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Manage Events</h2>
        <button onClick={openModal} className={styles.addButton}>+ Add New Event</button>
      </div>

      <div style={gridStyle}>
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} style={cardStyle}>
              {/* Image Section */}
              <div style={imageContainerStyle}>
                <img 
                  src={event.images?.[0]?.url || 'https://placehold.co/600x400?text=No+Image'} 
                  alt={event.title?.en || 'Event'} 
                  style={imageStyle}
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400?text=No+Image'; }}
                />
              </div>

              {/* Content Section */}
              <div style={contentStyle}>
                <div style={titleStyle}>
                  {event.title?.en || event.title?.mr || 'Untitled Event'}
                </div>
                
                <div style={infoStyle}>
                  <strong>📅 Date:</strong> {formatDate(event.eventDate)}
                </div>
                
                <div style={infoStyle}>
                  <strong>📍 Location:</strong> {event.location?.en || event.location?.mr || 'N/A'}
                </div>
                
                <div style={infoStyle}>
                   <strong>📂 Category:</strong> {event.category || 'General'}
                </div>

                <button 
                    style={deleteBtnStyle}
                    onClick={() => handleDelete(event._id)}
                >
                    Delete Event
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No events found. Click "Add New Event" to create one.</p>
        )}
      </div>

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