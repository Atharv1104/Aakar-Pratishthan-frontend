import 'react-photo-view/dist/react-photo-view.css';
import styles from "../../../CSS/Programs/programepage.module.css";
import { useTranslation } from 'react-i18next';

import { PhotoProvider, PhotoView } from 'react-photo-view';

export default function Programs() {
    const { t } = useTranslation('common');
    return (
        <>

            <div className={styles.container}>
                <div className={styles.headers}>
                    <h2>{t('programs.title')} </h2>
                    <h5>{t('programs.subtitle')}</h5>
                </div>

                <PhotoProvider>
                    <div className={styles.cardcontainer}>
                        <div className={styles.card}>
                            <PhotoView src='/Programs/5sept.jpg'>
                                <img src='/Programs/5sept.jpg' alt="" />

                            </PhotoView>
                            <p>{t('programs.description')}</p>
                        </div>
                        


                    </div>
                </PhotoProvider>
            </div>


        </>

    );
}
