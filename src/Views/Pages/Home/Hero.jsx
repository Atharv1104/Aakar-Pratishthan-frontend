
import React, { useEffect, useState } from 'react';
import { ChevronRight, Users, Heart, Target, BookOpen } from 'lucide-react';
import Styles from '../../../CSS/Homepage/Homepage.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const { t } = useTranslation('homepage');
    const [isVisible, setIsVisible] = useState(false);
    const navigate= useNavigate();
    const handledonateSubmit=()=>{
        navigate('/donations');
    }
    const handleprogramSubmit=()=>{
        navigate('/programs');
    }
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);



    return (

        <div className={Styles.homepage_container}> 
        <span className={Styles.hero_badge}>{t('badge')}</span>
            <section className={`${Styles.section1_grid} ${isVisible ? Styles.fade_in : ''}`}>

                <figure className={`${Styles.column_left} ${Styles.slide_in_left}`}>
                   
                    <img
                        src="/Homepage/Homepage1.jpg"
                        alt="Aakar Pratishthan - Empowering Communities Through Education and Sports"
                        loading="lazy"
                    />
                </figure>

                <div className={`${Styles.column_right} ${Styles.slide_in_right}`}>
                    <h1>{t('hero.title')}</h1>
                    <h2>{t('hero.subtitle')}</h2>

                    <p>
                        {t('hero.description')}
                    </p>

                    <p>
                        {t('hero.foundingtext')}
                    </p>

                    <p>
                        <strong>{t('hero.calltoaction')}</strong>
                    </p>

                    <button className={Styles.cta_button} onClick={handleprogramSubmit} aria-label="Learn more about our programs">
                        {t('hero.explore')}
                        <ChevronRight className={Styles.cta_button_icon} size={20} />
                    </button>
                    <button className={Styles.donate_button} onClick={handledonateSubmit} aria-label="Learn more about our programs">
                        {t('donate')}
                        <ChevronRight className={Styles.cta_button_icon} size={20} />
                    </button>


                </div>


                {/* <div className={Styles.overlayText}>
                    <div className={`${Styles.column_right} ${Styles.slide_in_right}`}>
                        <h1>{t('hero.title')}</h1>
                        <h2>{t('hero.subtitle')}</h2>

                        <p>
                            {t('hero.description')}
                        </p>

                        <p>
                            {t('hero.foundingtext')}
                        </p>

                        <p>
                            <strong>{t('hero.calltoaction')}</strong>
                        </p>



                        <button className={Styles.cta_button} aria-label="Learn more about our programs">
                            {t('hero.explore')}
                            <ChevronRight className={Styles.cta_button_icon} size={20} />
                        </button>
                    </div>

                </div> */}

            </section>


        </div>
    );
}

export default Hero;
