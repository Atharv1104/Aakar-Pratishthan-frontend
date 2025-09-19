
import '@fontsource/roboto/700.css'; 
import '@fontsource/roboto/300.css'; 
import '@fontsource/roboto/500.css'; 
import '@fontsource/roboto/400.css'; 

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css'  

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";
import AppBar from './components/Layouts/Appbar.jsx';
import Home from "./Views/Pages/Home/Home.jsx"
import AboutPage from './Views/Pages/About/Aboutpage.jsx';
import ContactPage from './Views/Pages/Contact/Contactpage.jsx';
import Footer from "./components/Layouts/Footer.jsx"
import AdminPage from './Views/Pages/Admin/AdminPage.jsx';
import Donationpage from './Views/Pages/Donation/donationPage.jsx';
import News from "./Views/Pages/News/newspage.jsx";
import Programs from "./Views/Pages/Programs/Programspage.jsx";
import Certificatepage from "./Views/Pages/Certificates/Certificatepage.jsx"
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
    <div>
      <AppBar />
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/donations' element={<Donationpage />} />
        <Route path='/news' element={<News />} />
        <Route path='/programs' element={<Programs />} />
        <Route path="/certificates" element={<Certificatepage />} />
        <Route path='*' element={<div style={{padding: '20px'}}><h1>Page Not Found</h1></div>} /> 
      </Routes>
      <Footer />
    </div>
      
  
      
    </BrowserRouter>
  );
}




export default App
