import 'react-photo-view/dist/react-photo-view.css';
import styles from "../../../CSS/News/newspage.module.css";
import { useTranslation } from 'react-i18next';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import React, { useState, useEffect } from 'react'; // Import React hooks
import apiClient from '../../utils/apiClients.js';

export default function News() {
    const { t } = useTranslation('common');
    const [newsItems, setNewsItems] = useState([]); // Holds images from database
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch images from the backend when component mounts
        const fetchNews = async () => {
            try {
                // This matches your backend GET route
                const response = await apiClient('/api/news');
                 
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                const data = await response.json();
                setNewsItems(data); // Set the array of { imageUrl, _id, date }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchNews();
    }, []); // Empty array means run once

    return (
        <div className={styles.container}>
            <h1>{t('news.title')}</h1>
            <h5>{t('news.subtitle')}</h5>
            
            <div className={styles.newscontainer}>
                <PhotoProvider>
                    {loading ? (
                        <p>Loading news...</p> // Show a loading message
                    ) : (
                        // Map over the news items from the database
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