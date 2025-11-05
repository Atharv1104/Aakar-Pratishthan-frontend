import { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Topbar from "../Admin/topbar.jsx";
import Sidebar from "../Admin/sidebar.jsx";

const DashboardLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // State for mobile drawer
    const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    // State for desktop sidebar collapse
    const [isCollapsed, setIsCollapsed] = useState(false);

    const drawerWidth = 240;
    const collapsedDrawerWidth = 80;

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                drawerWidth={drawerWidth}
                collapsedDrawerWidth={collapsedDrawerWidth}
                isMobile={isMobile}
                isMobileDrawerOpen={isMobileDrawerOpen}
                closeMobileDrawer={() => setMobileDrawerOpen(false)}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    marginLeft: isMobile ? 0 : (isCollapsed ? `${collapsedDrawerWidth}px` : `0 px`),
                    width: isMobile ? '100%' : `calc(100% - ${isCollapsed ? collapsedDrawerWidth : drawerWidth}px)`,
                }}
            >
                <Topbar
                    openMobileDrawer={() => setMobileDrawerOpen(true)}
                />
                <Box >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;