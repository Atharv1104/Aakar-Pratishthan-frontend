import 'react-photo-view/dist/react-photo-view.css';
import styles from "../../../CSS/News/newspage.module.css";
import { useTranslation } from 'react-i18next';

import { PhotoProvider, PhotoView } from 'react-photo-view';

export default function News() {
    const {t}=useTranslation('common')
    return (
        <>
            <div className={styles.container}>
                <h1>{t('news.title')} </h1>
                <h5>{t('news.subtitle')} </h5>
                
                    <div className={styles.newscontainer}>
                        <PhotoProvider>
                        <div className={styles.card}>
                            <PhotoView src='/News/News1.jpg'>
                                <img src='/News/News1.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News2.jpg'>
                                <img src='/News/News2.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News3.jpg'>
                                <img src='/News/News3.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News4.jpg'>
                                <img src='/News/News4.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News5.jpg'>
                                <img src='/News/News5.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News6.jpg'>
                                <img src='/News/News6.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News7.jpg'>
                                <img src='/News/News7.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News8.jpg'>
                                <img src='/News/News8.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        
                        <div className={styles.card}>
                            <PhotoView src='/News/News10.jpg'>
                                <img src='/News/News10.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News11.jpg'>
                                <img src='/News/News11.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News12.jpg'>
                                <img src='/News/News12.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News13.jpg'>
                                <img src='/News/News13.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News14.jpg'>
                                <img src='/News/News14.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News15.jpg'>
                                <img src='/News/News15.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News16.jpg'>
                                <img src='/News/News16.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News17.jpg'>
                                <img src='/News/News17.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News18.jpg'>
                                <img src='/News/News18.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News19.jpg'>
                                <img src='/News/News19.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News20.jpg'>
                                <img src='/News/News20.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        <div className={styles.card}>
                            <PhotoView src='/News/News21.jpg'>
                                <img src='/News/News21.jpg' alt="" />

                            </PhotoView>
                             
                        </div>
                        </PhotoProvider>
                    </div>
                
            </div>


        </>

    );
}
