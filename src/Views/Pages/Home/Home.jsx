
import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Hero from './Hero'
import Whatnext from './Whatnext';
import { Helmet } from 'react-helmet-async';


function Home() {
    return (
        <>
            <Helmet>
                <title>Home- Aakar Pratishthan</title>
                <meta name="description" content="Explore about Aakar pratishthan" />
            </Helmet>
            <Hero />
            <Whatnext />
        </>

    )
}

export default Home;