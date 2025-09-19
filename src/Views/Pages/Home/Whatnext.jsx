import styles from '../../../CSS/Homepage/Whatnext.module.css';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Whatnext() {
    const { t } = useTranslation('homepage');

    const navigate = useNavigate();

    const handleNavigation = (page) => {
        switch (page) {
            case 'certificates':
                navigate('/certificates');
                break;
            case 'registration':
                navigate('/contact#registration');
                break;
            case 'programs':
                navigate('/programs');
                break;
            case 'events':
                navigate('/programs');
                break;
            case 'mission':
                navigate('/about-us#mission-vision');
                break;
            case 'news':
                navigate('/news');
                break;
            case 'contact':
                navigate('/contact');
                break;
            default:
                navigate('/');
        }
        window.scrollTo(0, 0);
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h2>{t('whatnext.title')}</h2>
                <p>{t('whatnext.subtitle')}</p>
            </div>

            <div className={styles.sectionContainer}>
               
                <div className={styles.section}>
                   
                    <figure className={styles.animationLeft}>
                        <DotLottieReact
                            src="/Aboutpage/Discover.json"
                            loop
                            autoplay
                            className={styles.sectionAnimation}
                        />
                    </figure>
                    <div className={styles.cardRight}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('certificates')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                       {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    <div className={styles.cardTag}>{t('whatnext.getInvolved.static')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                   
                    <figure className={styles.animationLeft}>
                        <DotLottieReact
                            src="/Aboutpage/Discover.json"
                            loop
                            autoplay
                            className={styles.sectionAnimation}
                        />
                    </figure>
                    <div className={styles.cardRight}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('registration')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                       {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    <div className={styles.cardTag}>{t('whatnext.getInvolved.static')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className={styles.section}>
                    <figure className={styles.animationLeft}>
                        <DotLottieReact
                            src="/Aboutpage/Discover.json"
                            loop
                            autoplay
                            className={styles.sectionAnimation}
                        />
                    </figure>
                    <div className={styles.cardRight}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('programs')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.explorePrograms.title')}</h3>
                                <p>
                                    {t('whatnext.explorePrograms.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                       {t('whatnext.explorePrograms.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    <div className={styles.cardTag}>{t('whatnext.explorePrograms.static')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className={styles.section}>
                    <figure className={styles.animationLeft}>
                        <DotLottieReact
                            src="/Aboutpage/schedule.json"
                            loop
                            autoplay
                            className={styles.sectionAnimation}
                        />
                    </figure>
                    <div className={styles.cardRight}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('events')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.upcomingEvents.title')}</h3>
                                <p>
                                    {t('whatnext.upcomingEvents.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.upcomingEvents.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    <div className={styles.cardTag}>{t('whatnext.upcomingEvents.static')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className={styles.section}>
                    
                    
                    <figure className={styles.animationLeft}>
                        <DotLottieReact
                            src="/Aboutpage/Target.json"
                            loop
                            autoplay
                            className={styles.sectionAnimation}
                        />
                    </figure>
                    <div className={styles.cardRight}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('mission')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.missionVision.title')}</h3>
                                <p>
                                    {t('whatnext.missionVision.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.missionVision.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    <div className={styles.cardTag}>{t('whatnext.missionVision.static')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    

                <div className={styles.section}>
                    <figure className={styles.animationLeft}>
                        <DotLottieReact
                            src="/Aboutpage/News.json"
                            loop
                            autoplay
                            className={styles.sectionAnimation}
                        />
                    </figure>
                    <div className={styles.cardRight}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('news')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.inNews.title')}</h3>
                                <p>
                                    {t('whatnext.inNews.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.inNews.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    <div className={styles.cardTag}>{t('whatnext.inNews.static')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <figure className={styles.animationLeft}>
                        <DotLottieReact
                            src="/Aboutpage/Contact.json"
                            loop
                            autoplay
                            className={styles.sectionAnimation}
                        />
                    </figure>
                    <div className={styles.cardRight}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('contact')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.contact.title')}</h3>
                                <p>
                                    {t('whatnext.contact.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                       {t('whatnext.contact.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    <div className={styles.cardTag}>{t('whatnext.contact.static')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div className={styles.sectionContainer}>
                <div className={styles.imageOverlayContainer}>
                    <div className={styles.overlayText}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('registration')}>
                            <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button> */}
                                    {/* <div className={styles.cardTag}>{t('whatnext.getInvolved.static')}</div> */}
                                {/* </div> */}
                            {/* </div>
                        </div>
                    </div>
                </div>
                <div className={styles.imageOverlayContainer}>
                    <div className={styles.overlayText}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('programs')}> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                   
                                </div>
                            </div> */}

                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.explorePrograms.title')}</h3>
                                <p>
                                    {t('whatnext.explorePrograms.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.explorePrograms.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.imageOverlayContainer}>
                    <div className={styles.overlayText}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('events')}> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>

                                </div>
                            </div> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.upcomingEvents.title')}</h3>
                                <p>
                                    {t('whatnext.upcomingEvents.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.upcomingEvents.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.imageOverlayContainer}>
                    <div className={styles.overlayText}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('mission')}> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                   
                                </div>
                            </div> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.missionVision.title')}</h3>
                                <p>
                                    {t('whatnext.missionVision.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.missionVision.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div> */}
                {/* </div>
                <div className={styles.imageOverlayContainer}>
                    <div className={styles.overlayText}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('news')}> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    
                                </div>
                            </div> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.inNews.title')}</h3>
                                <p>
                                    {t('whatnext.inNews.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.inNews.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.imageOverlayContainer}>
                    <div className={styles.overlayText}>
                        <div className={styles.contentCard} onClick={() => handleNavigation('contact')}> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.getInvolved.title')}</h3>
                                <p>
                                    {t('whatnext.getInvolved.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                        {t('whatnext.getInvolved.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    
                                </div>
                            </div> */}
                            {/* <div className={styles.cardContent}>
                                <h3>{t('whatnext.contact.title')}</h3>
                                <p>
                                    {t('whatnext.contact.description')}
                                </p>
                                <div className={styles.cardFooter}>
                                    <button className={styles.cardButton}>
                                       {t('whatnext.contact.button')}
                                        <span className={styles.arrow}>→</span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div> */}
                    {/* </div> */}
                {/* </div> */}
                

            {/* </div> */}

        </main>
    );
}

export default Whatnext;
