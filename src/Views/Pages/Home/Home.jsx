
import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Hero from './Hero'
import Whatnext from './Whatnext';

import Styles from '../../../CSS/Homepage/Homepage.module.css'; 

function Home() {
    return (
       <>
       <Hero/>
       <Whatnext/>
       </>

    )
}

export default Home;