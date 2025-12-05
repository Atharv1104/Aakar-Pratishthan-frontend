


import React from 'react';
import Styles from "./Footer.module.css";
import { useTranslation } from 'react-i18next';
import {
    MapPin,
    Mail,
    Phone,
    ExternalLink,
    ArrowRight,
    Heart,
    Users,
    BookOpen,
    Trophy
} from 'lucide-react';

const handleNavigation = (href, event) => {
    if (href.includes('#')) {
        const [path, anchor] = href.split('#');
        const currentPath = window.location.pathname;
        
        // Same page scrolling
        if (currentPath === path || path === '') {
            event.preventDefault();
            setTimeout(() => {
                const element = document.getElementById(anchor);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
            return;
        }
        
        // Different page navigation + scrolling
        event.preventDefault();
        
        // Use window.location for reliable cross-page navigation
        window.location.href = href;
        
        return;
    }
    
    // Regular navigation - no action needed, let Link handle it
};


function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation('common');
    return (
        <footer className={Styles.footerContainer}>
            {/* Main Footer Content */}
            <div className={Styles.footerMain}>
                <div className={Styles.footerGrid}>

                    {/* Brand Section */}
                    <div className={Styles.brandSection}>
                        <div className={Styles.logoContainer}>
                            <img
                                src="/logo/Logo.jpg"
                                alt="Aakar Pratishthan Logo"
                                className={Styles.footerLogo}
                            />
                            <div className={Styles.brandText}>
                                <h3>{t('bottomnav.name')}</h3>
                                <p className={Styles.brandTagline}>पोलादपूर, जि. रायगड</p>
                            </div>
                        </div>
                        <p className={Styles.brandDescription}>
                            {t('bottomnav.description')}
                        </p>

                        {/* Enhanced Social Links */}
                        <div className={Styles.socialLinksContainer}>
                            <h4>{t('bottomnav.followourjourney')}</h4>
                            <div className={Styles.socialLinks}>
                                <a
                                    href="https://www.instagram.com/aakarpratishthan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={Styles.socialLink}
                                    aria-label="Follow us on Instagram"
                                >
                                    <img src="/icons/instagram.svg" alt="" className={Styles.socialIcon} />
                                    <span>{t('bottomnav.instagram')}</span>
                                </a>
                                <a
                                    href="https://www.facebook.com/aakarpratishthan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={Styles.socialLink}
                                    aria-label="Follow us on Facebook"
                                >
                                    <img src="/icons/facebook.svg" alt="" className={Styles.socialIcon} />
                                    <span>{t('bottomnav.facebook')}</span>
                                </a>
                                <a
                                    href="mailto:atharvpore11@gmail.com"
                                    className={Styles.socialLink}
                                    aria-label="Send us an email"
                                >
                                    <img src="/icons/gmail.svg" alt="" className={Styles.socialIcon} />
                                    <span>{t('bottomnav.email')}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Who We Are */}
                    <div className={Styles.footerColumn}>
                        <h4 className={Styles.columnTitle}>
                            <Users size={20} />
                            {t('navigation.whoweare')}
                        </h4>
                        <ul className={Styles.footerLinks}>
                            <li>
                                <a href="/" onClick={(e) => handleNavigation('/', e)}>
                                    <ArrowRight size={16} />
                                    {t('navigation.home')}
                                </a>
                            </li>
                            <li>
                                <a href="/about-us" onClick={(e) => handleNavigation('/about-us', e)}>
                                    <ArrowRight size={16} />
                                    {t('navigation.aboutus')}
                                </a>
                            </li>
                            <li>
                                <a href="/about-us#team" onClick={(e) => handleNavigation('/about-us#team', e)}>
                                    <ArrowRight size={16} />
                                    {t('navigation.ourteam')}
                                </a>
                            </li>
                            <li>
                                <a href="/contact" onClick={(e) => handleNavigation('/contact', e)}>
                                    <ArrowRight size={16} />
                                    {t('navigation.contact')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* What We Do */}
                    <div className={Styles.footerColumn}>
                        <h4 className={Styles.columnTitle}>
                            <Heart size={20} />
                            {t('navigation.whatwedo')}
                        </h4>
                        <ul className={Styles.footerLinks}>
                            <li>
                                <a href="/programs" onClick={(e) => handleNavigation('/programs', e)}>
                                    <BookOpen size={16} />
                                    {t('navigation.programs')}
                                </a>
                            </li>
                            
                            <li>
                                <a href="/news" onClick={(e) => handleNavigation('/news', e)}>
                                    <ArrowRight size={16} />
                                   {t('navigation.newsandupdates')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className={Styles.contactSection}>
                        <h4 className={Styles.columnTitle}>
                            <MapPin size={20} />
                            {t('bottomnav.getintouch')}
                        </h4>

                        <div className={Styles.contactInfo}>
                            <div className={Styles.contactItem}>

                                <div className={Styles.contactText}>
                                    <p><strong>{t('bottomnav.address.p1')}</strong></p>
                                    <p>{t('bottomnav.address.p2')}</p>
                                    <p>{t('bottomnav.address.p3')}</p>
                                    <p><strong>{t('bottomnav.address.p4')}</strong></p>
                                </div>
                            </div>


                        </div>

                        {/* Newsletter Signup */}
                        <div className={Styles.newsletter}>
                            <h5>
                                
                                {t('bottomnav.mailus')}
                            </h5>

                            <div className={Styles.newsletterForm}>
                                <div className={Styles.contactItem}>

                                    <div className={Styles.contactText}> 

                                        <a href="mailto:aakarpratishthan@gmail.com" target='blank'>
                                            aakarpratishthan@gmail.com
                                            <img src="/icons/external-link.svg" alt="" className={Styles.externalIcon} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className={Styles.footerBottom}>
                <div className={Styles.footerBottomContent}>
                    <div className={Styles.copyright}>
                        <p>
                            © {currentYear} Aakar Pratishthan. All rights reserved.

                        </p>
                    </div>
                    <div className={Styles.legalLinks}>
                        <a href="/privacy#privacy" target='blank'>
                           
                            Privacy Policy
                        </a>
                        <a href="/privacy#terms" target='blank'>
                            
                            Terms of Service
                        </a>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
