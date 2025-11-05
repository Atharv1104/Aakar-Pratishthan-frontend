import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Card,
    CardContent,
    IconButton,
    CircularProgress,
    Stack,
    Chip
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import apiClient from '../../utils/apiClients.js';

// This modal is for both desktop "View" and the default mobile view.
const DonationDetailModal = ({ submission, open, handleClose, handleDelete }) => {
    if (!open || !submission) {
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Donation Record
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {submission.fullName}
                        </Typography>
                        <Chip 
                            label={`Amount: ₹${submission.amount}`} 
                            color="success" 
                            sx={{ fontWeight: 'bold', mb: 2 }} 
                        />
                        <Typography color="text.secondary" gutterBottom>
                            <strong>Email:</strong> {submission.email}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            <strong>Phone:</strong> {submission.phone}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            <strong>Payment ID:</strong> {submission.paymentId || 'N/A'}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                            <strong>Message:</strong>
                            <br />
                            {submission.message || 'No message provided.'}
                        </Typography>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0, pb: 2, pr: 3 }}>
                 <Button 
                    variant="contained" 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(submission._id)}
                >
                    Delete Record
                </Button>
            </DialogTitle>
        </Dialog>
    );
};

// --- Main Donations Component ---
const ManageDonations = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // --- DATA FETCHING ---
    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await apiClient('/api/donation');
            if (!res.ok) throw new Error('Failed to fetch donation records');
            const data = await res.json();
            setSubmissions(data);
        } catch (err) {
            console.error(err);
            setSubmissions([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    // --- EVENT HANDLERS ---
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this donation record?")) {
            return;
        }
        try {
            const res = await apiClient(`/api/donation/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            fetchSubmissions(); // Refresh data
            handleCloseModal(); // Close modal if it was open
        } catch (err) {
            console.error(err);
            alert('Failed to delete record.');
        }
    };

    const handleViewClick = (submission) => {
        setSelectedSubmission(submission);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setTimeout(() => setSelectedSubmission(null), 300);
    };

    // --- COLUMNS DEFINITION ---
    const desktopColumns = [
        { 
            field: "createdAt", 
            headerName: "Date", 
            flex: 1, 
            type: "date",
            valueGetter: (params) => new Date(params.row.createdAt)
        },
        { 
            field: "fullName", 
            headerName: "Name", 
            flex: 1, 
            cellClassName: "name-column--cell",
        },
        { 
            field: "amount", 
            headerName: "Amount (₹)", 
            flex: 0.5, 
            type: "number",
            renderCell: (params) => (
                <Typography sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
                    ₹{params.value}
                </Typography>
            )
        },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ mt: 1, height: '100%', alignItems: 'center' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="small" 
                        onClick={() => handleViewClick(row)}
                    >
                        View Details
                    </Button>
                    <IconButton 
                        color="error"
                        onClick={() => handleDelete(row._id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            )
        },
    ];
    
    const mobileColumns = [
        { 
            field: "fullName", 
            headerName: "Name", 
            flex: 1,
        },
        { 
            field: "amount", 
            headerName: "Amount (₹)", 
            flex: 1, 
            type: "number",
            renderCell: (params) => `₹${params.value}`
        },
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
            <Box textAlign={"center"}>
                <h3>Donation Records</h3>
                <p>View all confirmed donation submissions</p>
            </Box>
            <Box m={"1rem 0"} height={"75vh"} sx={{
                "& .MMuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .name-column--cell": { color: "#080647ff" },
                "& .MuiDataGrid-columnHeader": {
                    color: "white",
                    backgroundColor: "#16476A !important",
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: "#f0f0f0" },
                "& .MuiDataGrid-loadingOverlay": { backgroundColor: "#f0f0f0" }
            }}>
                <DataGrid
                    rows={submissions}
                    columns={isMobile ? mobileColumns : desktopColumns}
                    loading={loading}
                    getRowId={(row) => row._id} // Use MongoDB's _id
                />
            </Box>
             <DonationDetailModal
                submission={selectedSubmission}
                open={modalOpen}
                handleClose={handleCloseModal}
                handleDelete={handleDelete}
            />
        </Box>
    )
}

export default ManageDonations
