
import React, { useState, useEffect } from 'react';
import { 
    Box, Button, Card, CardMedia, CardActions, 
    IconButton, Typography, Modal, CircularProgress 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// FIX: The import path was incorrect. This attempts to fix the path resolution.
import AddNews from '../Forms/addnews.jsx'; // Your existing form
import apiClient from '../../utils/apiClients.js';

// Style for the modal popup
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // RESPONSIVE MODAL:
  // Use 90% of viewport width on extra-small (xs) screens
  // Use a fixed width of 400px on small (sm) screens and up
  width: { xs: '90vw', sm: 400 },
  maxHeight: '90vh', // Ensure modal doesn't overflow vertically
  overflowY: 'auto',  // Allow scrolling inside the modal if content is long
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: { xs: 2, sm: 4 }, // Add responsive padding
};

function ManageNews() {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    // Function to fetch all news items
    const fetchNews = async () => {
        try {
            setLoading(true);
            const res = await apiClient('/news');
            const data = await res.json();
            setNewsItems(data);
        } catch (err) {
            console.error("Failed to fetch news:", err);
        }
        setLoading(false);
    };

    // Fetch news when the component loads
    useEffect(() => {
        fetchNews();
    }, []);

    // Function to handle deleting a news item
    const handleDelete = async (id) => {
        // Use a custom modal in production instead of window.confirm
        if (!window.confirm("Are you sure you want to delete this image?")) {
            return;
        }
        try {
            const res = await apiClient(`/api/news/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                // Remove the item from the state to update the UI
                setNewsItems(newsItems.filter(item => item._id !== id));
            } else {
                alert("Failed to delete item.");
            }
        } catch (err) {
            console.error("Failed to delete news:", err);
        }
    };

    // Function to run after a new image is successfully uploaded
    const handleUploadSuccess = () => {
        setOpenModal(false); // Close the modal
        fetchNews();         // Refresh the list of images
    };

    return (
        <Box sx={{ m: { xs: 1, sm: 2 } }}> {/* Responsive margin */}
            
            {/* RESPONSIVE HEADER */}
            <Box sx={{
                display: 'flex',
                // Stack vertically on mobile (xs)
                flexDirection: { xs: 'column', sm: 'row' }, 
                justifyContent: 'space-between',
                // Align items differently on mobile
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                mb: 2
            }}>
                <Typography variant="h4" sx={{ mb: { xs: 2, sm: 0 } }}> {/* Add margin bottom on mobile */}
                    Manage News
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenModal(true)}
                    sx={{ width: { xs: '100%', sm: 'auto' } }} // Full width button on mobile
                >
                    Add New Image
                </Button>
            </Box>

            {/* Modal for adding a new image */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Box sx={modalStyle}>
                    {/* The AddNews form will live inside here */}
                    <AddNews onUploadSuccess={handleUploadSuccess} />
                </Box>
            </Modal>

            {/* RESPONSIVE Grid of existing news images */}
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    // Center cards on mobile, align left on desktop
                    justifyContent: { xs: 'center', sm: 'flex-start' } 
                }}>
                    {newsItems.map(item => (
                        <Card key={item._id} sx={{ 
                            // Full width on mobile, fixed width on larger screens
                            width: { xs: '100%', sm: 280, md: 300 },
                            maxWidth: 345 // Ensure it doesn't get too large
                        }}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={item.imageUrl}
                                alt="News Image"
                            />
                            <CardActions disableSpacing>
                                <IconButton 
                                    aria-label="delete" 
                                    onClick={() => handleDelete(item._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default ManageNews;

