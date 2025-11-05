import React, { useState, useEffect } from 'react';
import {
    Box, Button, Typography, Modal, CircularProgress,
    Card, CardMedia, CardContent, CardActions, IconButton, Grid, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddEventForm from '../Forms/addEvents.jsx'; // Your existing form
import apiClient from '../../utils/apiClients.js';

// Style for the modal popup
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', sm: 600 }, // Wider modal for event form
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
};

function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    // Function to fetch all events
    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await apiClient('/api/events');
            if (!res.ok) throw new Error('Failed to fetch events');
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // Fetch events when the component loads
    useEffect(() => {
        fetchEvents();
    }, []);

    // Function to handle deleting an event
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event? This will also delete all associated images.")) {
            return;
        }
        try {
            const res = await apiClient(`/api/events/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchEvents(); // Refresh the list
            } else {
                alert("Failed to delete event.");
            }
        } catch (err) {
            console.error("Failed to delete event:", err);
        }
    };

    // Function to run after a new event is successfully uploaded
    const handleUploadSuccess = () => {
        setOpenModal(false); // Close the modal
        fetchEvents();       // Refresh the list of events
    };

    return (
        <Box sx={{ m: { xs: 1, sm: 2 } }}>
            {/* Header and Add Button */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 2
            }}>
                <Typography variant="h4" sx={{ mb: { xs: 2, sm: 0 } }}>
                    Manage Events
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenModal(true)}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Add New Event
                </Button>
            </Box>

            {/* Modal for adding a new event */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Box sx={modalStyle}>
                    {/* Your addEvents.jsx form is used here.
                      We pass 'handleUploadSuccess' to it, which it
                      calls when the form submits successfully.
                    */}
                    <AddEventForm onUploadSuccess={handleUploadSuccess} />
                </Box>
            </Modal>

            {/* Grid of existing event cards */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {events.map(event => (
                        <Grid item key={event._id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    // Use the first image URL as the cover.
                                    // Add a fallback placeholder image
                                    image={event.images[0]?.url || 'https://placehold.co/600x400/E2E8F0/475569?text=No+Image'}
                                    alt={event.title}
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E2E8F0/475569?text=Image+Error'; }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {event.title}
                                    </Typography>
                                    <Chip 
                                        label={event.category} 
                                        size="small" 
                                        sx={{ mb: 1, fontWeight: 'bold' }} 
                                        color={event.status === 'upcoming' ? 'primary' : 'default'}
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {event.description.substring(0, 100)}...
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <IconButton 
                                        aria-label="delete" 
                                        onClick={() => handleDelete(event._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default ManageEvents;
