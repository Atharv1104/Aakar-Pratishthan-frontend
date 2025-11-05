import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../CSS/Privacy/privacy.module.css';
import { Link } from 'react-router-dom'; 

function DonationPolicyPage() {
    
    const { t } = useTranslation('donationterms');
    
    return (
        <div className={styles.pageContainer}>
            <div className={styles.content}>
                
                <h1>{t('policy.headers.mainheader')}</h1>
                <p>{t('policy.p_intro')}</p>

                <h2>{t('policy.headers.h1')}</h2>
                <p>{t('policy.p1')}</p>

                <h2>{t('policy.headers.h2')}</h2>
                <p>{t('policy.p2')}</p> 

                <h2>{t('policy.headers.h3')}</h2>
                <p>{t('policy.p3')}</p>

                <h2>{t('policy.headers.h4')}</h2>
                <p>{t('policy.p4')}</p>

                <h2>{t('policy.headers.h5')}</h2>
                <p>
                    {t('policy.p5')} <Link to="/privacy#privacy">Privacy Policy</Link>.
                </p>

                <h2>{t('policy.headers.h6')}</h2>
                <p>{t('policy.p6')}</p>
            </div>
        </div>
    );
}

export default DonationPolicyPage;