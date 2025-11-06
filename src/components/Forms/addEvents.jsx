import React, { useState } from 'react';
import apiClient from '../../utils/apiClients';
import styles from '../../CSS/Admin/addnews.module.css'; // Assuming you use this

// The component *only* needs 'onEventAdded' prop
const AddEvent = ({ onEventAdded }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await apiClient('/events', {
        method: 'POST',
        body: formData,
        // apiClient will NOT set Content-Type for FormData, which is correct
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ message: 'Failed to create event' }));
        throw new Error(errData.message || 'Failed to create event');
      }

      // We don't need the response data
      // const newEvent = await res.json(); 

      // THIS IS THE BIG FIX:
      // Just call the prop to signal "I am done".
      // We do NOT pass any data back,
      // because the parent (events.jsx) is just going to re-fetch.
      onEventAdded(); 
      
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addNewsForm}>
      <h2>Add New Event</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="title">Event Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Event Date:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="location">Event Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">Event Image:</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      
      <button type="submit" disabled={submitting} className={styles.submitButton}>
        {submitting ? 'Adding...' : 'Add Event'}
      </button>
      
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
};

export default AddEvent;