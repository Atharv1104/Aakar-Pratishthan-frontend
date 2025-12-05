import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, // Added missing import
    Card,
    CardContent,
    Stack,
    IconButton,
    Modal 
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddVolunteerForm from '../Forms/addVoluteer.jsx'; 
import apiClient from '../../utils/apiClients.js';

// Style for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', sm: 500 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
};

// --- This modal is for MOBILE VIEW only ---
const UserDetailModal = ({ user, open, handleClose, handleStatusChange, handleDelete }) => {
    if (!open || !user) {
        return null;
    }

    const onApprove = () => handleStatusChange(user._id, 'approved');
    const onReject = () => handleStatusChange(user._id, 'rejected');
    const onDelete = () => handleDelete(user._id);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Volunteer Information
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>{user.firstname} {user.lastname}</Typography>
                        <Typography color="text.secondary"><strong>Email:</strong> {user.email}</Typography>
                        <Typography color="text.secondary"><strong>Phone:</strong> {user.phone}</Typography>
                        <Typography color="text.secondary"><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</Typography>
                        <Typography color="text.secondary"><strong>Status:</strong> {user.status}</Typography>
                        <Typography color="text.secondary" sx={{mt: 1}}><strong>Message:</strong> {user.message || 'N/A'}</Typography>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions sx={{ p: '16px', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1}>
                    {user.status !== 'approved' && (
                        <Button variant="contained" color="success" size="small" onClick={onApprove}>Approve</Button>
                    )}
                    {user.status !== 'rejected' && (
                        <Button variant="contained" color="warning" size="small" onClick={onReject}>Reject</Button>
                    )}
                </Stack>
                <Button variant="outlined" color="error" size="small" onClick={onDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

// --- MAIN COMPONENT ---
const Team = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // State for data
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);

    // --- DATA FETCHING ---
    const fetchVolunteers = async () => {
        setLoading(true);
        try {
            // FIX: Removed '/api' prefix
            const res = await apiClient('/volunteer');
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            setVolunteers(data.events || []); 
        } catch (err) {
            console.error(err);
            setVolunteers([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    // --- EVENT HANDLERS ---
    const handleStatusChange = async (id, newStatus) => {
        try {
            // FIX: Removed '/api' prefix
            const res = await apiClient(`/volunteer/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error('Failed to update status');
            fetchVolunteers(); 
            handleCloseDetailModal();
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this volunteer permanently?")) return;
        try {
            // FIX: Removed '/api' prefix
            const res = await apiClient(`/volunteer/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete');
            fetchVolunteers(); 
            handleCloseDetailModal(); 
        } catch (err) {
            console.error(err);
            alert('Failed to delete volunteer');
        }
    };

    const handleViewClick = (user) => {
        setSelectedUser(user);
        setDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setDetailModalOpen(false);
        setTimeout(() => setSelectedUser(null), 300);
    };

    // Desktop Columns
    const desktopColumns = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        { 
            field: "name", 
            headerName: "Name", 
            flex: 1, 
            // FIX: Updated valueGetter for DataGrid v8
            valueGetter: (value, row) => `${row.firstname} ${row.lastname}`
        },
        { 
            field: "dob", 
            headerName: "DOB", 
            flex: 1, 
            type: "date",
            // FIX: Updated valueGetter for DataGrid v8
            valueGetter: (value, row) => new Date(row.dob)
        },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "status", headerName: "Status", flex: 1,
            renderCell: ({ row }) => (
                <Typography sx={{ 
                    fontStyle: 'italic', 
                    fontWeight: 'bold',
                    color: row.status === 'approved' ? theme.palette.success.main : 
                           row.status === 'rejected' ? theme.palette.error.main : 
                           theme.palette.warning.main
                }}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </Typography>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 2,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}> 
                    {row.status !== 'approved' && (
                        <Button variant="contained" color="success" size="small" onClick={() => handleStatusChange(row._id, 'approved')}>Approve</Button>
                    )}
                    {row.status !== 'rejected' && (
                        <Button variant="contained" color="warning" size="small" onClick={() => handleStatusChange(row._id, 'rejected')}>Reject</Button>
                    )}
                    <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(row._id)}>Delete</Button>
                </Stack>
            )
        },  
    ];

    // Mobile Columns
    const mobileColumns = [
        { 
            field: "name", 
            headerName: "Name", 
            flex: 1,
            // FIX: Updated valueGetter for DataGrid v8
            valueGetter: (value, row) => `${row.firstname} ${row.lastname}`
        },
        { field: "status", headerName: "Status", flex: 1 },
        {
            field: "actions",
            headerName: "Details",
            flex: 1,
            renderCell: ({ row }) => (
                <Button variant="contained" size="small" onClick={() => handleViewClick(row)}>
                    View
                </Button>
            )
        }
    ];

    return (
        <Box m={"1rem"}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 2
            }}>
                <Box textAlign={{ xs: 'center', sm: 'left' }} sx={{ mb: { xs: 2, sm: 0 } }}>
                    <h3>Team</h3>
                    <p>Manage Your Volunteers</p>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setAddModalOpen(true)}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Add Volunteer
                </Button>
            </Box>

            <Modal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
            >
                <Box sx={modalStyle}>
                    <AddVolunteerForm 
                        handleClose={() => setAddModalOpen(false)}
                        onVolunteerAdded={fetchVolunteers} 
                    />
                </Box>
            </Modal>

            <Box m={"1rem 0"} height={"75vh"} sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .MuiDataGrid-columnHeader": {
                    color: "white",
                    backgroundColor: "#16476A !important",
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: "#f0f0f0" },
            }}>
                <DataGrid
                    rows={volunteers}
                    columns={isMobile ? mobileColumns : desktopColumns}
                    loading={loading}
                    getRowId={(row) => row._id} 
                />
            </Box>
            
            <UserDetailModal
                user={selectedUser}
                open={detailModalOpen}
                handleClose={handleCloseDetailModal}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
            />
        </Box>
    );
};

export default Team;