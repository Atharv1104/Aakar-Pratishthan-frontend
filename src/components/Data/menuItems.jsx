// src/Views/Pages/Admin/Dashboard/layout/menuItems.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';

export const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Events', icon: <EventIcon />, path: '/admin/events' },
  { text: 'News', icon: <ArticleIcon />, path: '/admin/news' },
  { text: 'Donations', icon: <VolunteerActivismIcon />, path: '/admin/donations' },
  { text: 'Volunteers', icon: <PeopleIcon />, path: '/admin/team' },
  { text: 'Contact Inquiries', icon: <ContactMailIcon />, path: '/admin/contact' },
  
];