import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { ResponsiveLine } from '@nivo/line';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import apiClient from '../../utils/apiClients.js';
// A simple component for the stat cards
const StatBox = ({ title, value, icon, color }) => (
    <Paper 
        elevation={3}
        sx={{ 
            p: 3, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderRadius: 2,
            height: '100%' 
        }}
    >
        <Box>
            <Typography variant="h6" color="text.secondary">{title}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{value}</Typography>
        </Box>
        <Box sx={{ 
            backgroundColor: color, 
            color: '#fff', 
            borderRadius: '50%', 
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </Box>
    </Paper>
);

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                // This calls the new route you just added
                const res = await apiClient('/dashboard/stats');
                if (!res.ok) throw new Error('Failed to fetch dashboard stats');
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading || !stats) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Destructure all the stats from the API response
    const { totalDonations, pendingVolunteers, totalContacts, totalVolunteers, donationHistory } = stats;

    return (
        <Box m={{ xs: 1, sm: 2 }}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Dashboard</Typography>
                <Typography variant="h6" color="text.secondary">Welcome to your dashboard</Typography>
            </Box>

            {/* --- STAT CARDS --- */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatBox 
                        title="Total Donations" 
                        value={`₹${totalDonations.toLocaleString('en-IN')}`} 
                        icon={<MonetizationOnIcon />}
                        color="#059669" // Green
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatBox 
                        title="Pending Volunteers" 
                        value={pendingVolunteers} 
                        icon={<PeopleIcon />}
                        color="#D97706" // Yellow
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatBox 
                        title="Total Inquiries" 
                        value={totalContacts} 
                        icon={<EmailIcon />}
                        color="#2563EB" // Blue
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatBox 
                        title="Total Members" 
                        value={totalVolunteers} 
                        icon={<GroupsIcon />}
                        color="#7C3AED" // Purple
                    />
                </Grid>
            </Grid>

            {/* --- LINE CHART --- */}
            <Paper elevation={3} sx={{ height: '50vh', minHeight: '300px', p: 2, mt: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Donation History (By Month)</Typography>
                {donationHistory[0].data.length > 0 ? (
                    <ResponsiveLine
                        data={donationHistory}
                        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false
                        }}
                        yFormat=" >-,"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Month',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Amount (₹)',
                            legendOffset: -50,
                            legendPosition: 'middle',
                            format: " >-,"
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        colors={['#059669']} // Green
                        tooltip={({ point }) => (
                            <Box sx={{ p: 1, bgcolor: 'white', border: '1px solid #ccc', borderRadius: 1 }}>
                                <strong>{point.data.x}</strong>: ₹{point.data.y.toLocaleString('en-IN')}
                            </Box>
                        )}
                    />
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography color="text.secondary">No donation data available to display chart.</Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default Dashboard

