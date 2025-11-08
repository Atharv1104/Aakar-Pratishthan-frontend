// import 'react-photo-view/dist/react-photo-view.css';
// import styles from "../../../CSS/News/newspage.module.css";
// import { useTranslation } from 'react-i18next';
// import { PhotoProvider, PhotoView } from 'react-photo-view';
// import React, { useState, useEffect } from 'react'; // Import React hooks
// import apiClient from '../../../utils/apiClients.js';

// export default function News() {
//     const { t } = useTranslation('common');
//     const [newsItems, setNewsItems] = useState([]); // Holds images from database
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch images from the backend when component mounts
//         const fetchNews = async () => {
//             try {
//                 // This matches your backend GET route
//                 const response = await apiClient('/api/news');
                 
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch news');
//                 }
//                 const data = await response.json();
//                 setNewsItems(data); // Set the array of { imageUrl, _id, date }
//             } catch (error) {
//                 console.error(error);
//             }
//             setLoading(false);
//         };

//         fetchNews();
//     }, []); // Empty array means run once

//     return (
//         <div className={styles.container}>
//             <h1>{t('news.title')}</h1>
//             <h5>{t('news.subtitle')}</h5>
            
//             <div className={styles.newscontainer}>
//                 <PhotoProvider>
//                     {loading ? (
//                         <p>Loading news...</p> // Show a loading message
//                     ) : (
//                         // Map over the news items from the database
//                         newsItems.map((item) => (
//                             <div className={styles.card} key={item._id}>
//                                 <PhotoView src={item.imageUrl}>
//                                     <img src={item.imageUrl} alt="Aakar Pratishthan News" />
//                                 </PhotoView>
                                
//                             </div>
//                         ))
//                     )}
//                 </PhotoProvider>
//             </div>
//         </div>
//     );
// }


import 'react-photo-view/dist/react-photo-view.css';
import styles from "../../../CSS/News/newspage.module.css";
import { useTranslation } from 'react-i18next';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import React, { useState, useEffect } from 'react';

// 1. Correct the import path (it's 3 levels up)
import apiClient from '../../../utils/apiClients.js';

export default function News() {
    const { t } = useTranslation('common');
    const [newsItems, setNewsItems] = useState([]); // This is correct
    const [loading, setLoading] = useState(true);

    // 2. You must define the error state
    const [error, setError] = useState(null);

    useEffect(() => {
        // 3. You MUST define an async function *inside* useEffect
        const fetchNews = async () => {
            try {
                // Now you can use 'await'
                const response = await apiClient("/news"); // Your API call
                
                if (!response.ok) {
                    console.error("API Response not OK", response);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Successfully fetched news data:", data);

                // 4. Use the correct state setter: 'setNewsItems'
                setNewsItems(data);

            } catch (error) {
                console.error("Error fetching news:", error.message);
                setError(error.message); // Now this will work
            } finally {
                // 5. You MUST set loading to false when done
                setLoading(false); 
            }
        };

        // 6. Call the new async function
        fetchNews();

    // 7. You MUST add the empty array [] to run this once
    }, []); 

    return (
        <div className={styles.container}>
            <h1>{t('news.title')}</h1>
            <h5>{t('news.subtitle')}</h5>
            
            <div className={styles.newscontainer}>
                <PhotoProvider>
                    {loading ? (
                        <p>Loading news...</p>
                    // 8. Add a case to show an error message
                    ) : error ? (
                        <p>Error: {error}</p>
                    // 9. Check if the array is empty
                    ) : newsItems.length === 0 ? (
                        <p>No news items found.</p>
                    ) : (
                        // Map over the correct 'newsItems' variable
                        newsItems.map((item) => (
                            <div className={styles.card} key={item._id}>
                                <PhotoView src={item.imageUrl}>
                                    <img src={item.imageUrl} alt="Aakar Pratishthan News" />
                                </PhotoView>
                            </div>
                        ))
                    )}
                </PhotoProvider>
            </div>
        </div>
    );
}