// src/main.jsx;
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/700.css'; 
import '@fontsource/roboto/300.css'; 
import '@fontsource/roboto/500.css'; 
import '@fontsource/roboto/400.css'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";
import './i18n';



import App from './App.jsx';
// import'./index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);


