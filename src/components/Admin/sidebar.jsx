import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { menuItems } from '../Data/menuItems';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = (props) => {
    const {
        drawerWidth,
        collapsedDrawerWidth,
        isMobile,
        isMobileDrawerOpen,
        closeMobileDrawer,
        isCollapsed,
        setIsCollapsed
    } = props;

    const drawerContent = (
        <div>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: [1] }}>
                {!isCollapsed && (
                    <Typography variant="h6" noWrap component="div" color="white">
                        Admin Panel
                    </Typography>
                )}
                {/* This button is only for collapsing on desktop */}
                {!isMobile && (
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? <ChevronRightIcon sx={{ color: 'white' }} /> : <ChevronLeftIcon sx={{ color: 'white' }} />}
                    </IconButton>
                )}
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            onClick={isMobile ? closeMobileDrawer : undefined}
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 'auto' : 3, justifyContent: 'center', color: 'white' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: isCollapsed ? 0 : 1, color: 'white' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? isMobileDrawerOpen : true}
            onClose={closeMobileDrawer}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile
            sx={{
                width: isMobile ? drawerWidth : (isCollapsed ? collapsedDrawerWidth : drawerWidth),
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isMobile ? drawerWidth : (isCollapsed ? collapsedDrawerWidth : drawerWidth),
                    boxSizing: 'border-box',
                    backgroundColor: '#012d58ff',
                    color: 'white',
                    transition: (theme) => theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflowX: 'hidden',
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};

export default Sidebar;