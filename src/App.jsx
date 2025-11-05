import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css'


import MainLayout from './components/Layouts/Mainlayout.jsx';
import DashboardLayout from './components/Layouts/DashboardLayout.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";
import Home from "./Views/Pages/Home/Home.jsx"
import AboutPage from './Views/Pages/About/Aboutpage.jsx';
import ContactPage from './Views/Pages/Contact/Contactpage.jsx';

import Donationpage from './Views/Pages/Donation/donationPage.jsx';
import News from "./Views/Pages/News/newspage.jsx";
import Programs from "./Views/Pages/Programs/Programspage.jsx";
import Certificatepage from "./Views/Pages/Certificates/Certificatepage.jsx"
import PrivacyPage from './Views/Pages/Privacy/privacypage.jsx';
import DonationPolicyPage from './Views/Pages/policies/donation.jsx';

import ProtectedRoute from './components/Admin/ProtectedRoute.jsx';
import LoginPage from './components/Admin/LoginPage.jsx';

import Dashboard from './components/Admin/dashboard.jsx';
import Team from './components/Admin/team.jsx';
import Contact from './components/Admin/contact.jsx';
import MaanageNews from './components/Admin/news.jsx';
import ManageDonations from './components/Admin/donations.jsx';
import ManageEvents from './components/Admin/events.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
        <Routes>
          {/* --- Public Website Routes --- */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about-us' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/donations' element={<Donationpage />} />
            <Route path='/news' element={<News />} />
            <Route path='/programs' element={<Programs />} />
            <Route path="/certificates" element={<Certificatepage />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/donation-policy' element={<DonationPolicyPage />} />
            <Route path='*' element={<div style={{ padding: '20px' }}><h1>Page Not Found</h1></div>} />
          </Route>

          {/* --- 2. ADD THE PUBLIC LOGIN ROUTE --- */}
          {/* This route is not protected and does not use the DashboardLayout */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* --- 3. WRAP ADMIN ROUTES IN THE PROTECTED ROUTE --- */}
          {/* This route group checks for a token.
            If a token exists, it renders the <Outlet /> (DashboardLayout).
            If not, it redirects to /admin/login.
          */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* Set the default /admin route to show the dashboard.
                (Your AdminPage.jsx just renders <Dashboard/> anyway)
              */}
              <Route index element={<Dashboard />} /> 
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="team" element={<Team/>} /> 
              <Route path="contact" element={<Contact/>} /> 
              <Route path="news" element={<MaanageNews/>} />
              <Route path="donations" element={<ManageDonations/>} />
              <Route path="events" element={<ManageEvents/>} />
            </Route>
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App