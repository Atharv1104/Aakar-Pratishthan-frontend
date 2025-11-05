import { Box, IconButton, InputBase, useTheme, useMediaQuery } from "@mui/material";
import LanguageToggle from "../languageToggle";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = ({ openMobileDrawer }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box display="flex" justifyContent="space-between" p={1} alignItems="center">
            <Box display="flex" alignItems="center">
                {/* Hamburger Menu on Mobile */}
                {isMobile && (
                    <IconButton onClick={openMobileDrawer} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                )}
                {/* Searchbox (hidden on mobile) */}
                {!isMobile && (
                    <Box display="flex" backgroundColor="#f1f3f4" borderRadius="3px">
                        <InputBase sx={{ ml: 1, flex: 2 }} placeholder="Search" />
                        <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {/* Icons */}
            <Box display="flex" ml="auto">
                <IconButton>
                    <LanguageToggle />
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;