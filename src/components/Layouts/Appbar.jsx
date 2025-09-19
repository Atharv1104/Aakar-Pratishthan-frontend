import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Menu,
    ChevronDown,
    X,
    BookOpen,
    Trophy
} from 'lucide-react';
import LanguageToggle from "../languageToggle.jsx";
import Donate from "../donateButton.jsx";
import styles from './AppBar.module.css';

const AppBar = () => {
    const { t } = useTranslation('common');
    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { label: t('navigation.home'), href: '/' },
        { label: t('navigation.whoweare'), href: '#', hasDropdown: true, dropdownId: 1 },
        { label: t('navigation.whatwedo'), href: '/programs'}, 
        { label: t('navigation.newsandupdates'), href: '/news' },
        { label: t('navigation.contact'), href: '/contact' },
        { label: t('navigation.adminlogin'), href: '/admin' },
    ];

    const dropdownItems = {
        1: [
            { label: t('navigation.aboutus'), href: '/about-us', icon: BookOpen },
            { label: t('navigation.ourteam'), href: '/about-us#team', icon: BookOpen },
            { label: t('navigation.missionvision'), href: '/about-us#mission-vision', icon: BookOpen }
        ],
       
    };

    // SIMPLIFIED SMOOTH SCROLL FUNCTION
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


    const toggleMobileSubmenu = (index) => {
        setMobileSubmenuOpen(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleMenuHover = (index) => {
        setActiveMenu(index);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
    };

    // ONLY MANUAL CLOSE FUNCTION
   

    return (
        <header className={`${styles.container} ${isScrolled ? styles.scrolled : ''}`}>
            {/* Top Bar */}
            <div className={styles.topBar}>
                <div className={styles.topBarInner}>
                    <div className={styles.topBarRight}>
                        <Donate />
                        <figure className={styles.socialIcons}>
                            <a href="#" className={styles.socialIcon} aria-label="Facebook">
                                <img src="/icons/facebook.svg" alt="Facebook" className={styles.iconcolor} />
                            </a>
                            <a href="#" className={styles.socialIcon} aria-label="X">
                                <img src="/icons/x.svg" alt="X" className={styles.iconcolor} />
                            </a>
                            <a href="#" className={styles.socialIcon} aria-label="Instagram">
                                <img src="/icons/instagram.svg" alt="Instagram" className={styles.iconcolor} />
                            </a>

                        </figure>
                        <Box sx={{ ml: 2 }}>
                            <LanguageToggle />
                        </Box>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className={styles.mainNav} role="navigation">
                <div className={styles.mainNavInner}>
                    <div className={styles.navContainer}>
                        {/* Logo Section */}
                        <div className={styles.logoSection}>
                            <figure className={styles.logoContainer}>
                                <img
                                    src="/logo/Logo.jpg"
                                    alt="Aakar Pratishthan Logo"
                                    className={styles.logoImage}
                                />
                            </figure>
                            <figure className={styles.logoTextSection}>
                                <img
                                    src="/logo/Aakar_text_transperent.jpg"
                                    alt="Aakar Pratishthan Text"
                                    className={styles.logoTextImage}
                                />
                                <p className={styles.companyName}>पोलादपूर, जि. रायगड</p>
                            </figure>
                        </div>

                        {/* Desktop Navigation */}
                        <div className={styles.navigation}>
                            {navigationItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.navItem}
                                    onMouseEnter={() => item.hasDropdown && handleMenuHover(item.dropdownId)}
                                    onMouseLeave={handleMenuLeave}
                                >
                                    <a
                                        href={item.href}
                                        className={styles.navLink}
                                        aria-haspopup={item.hasDropdown ? "true" : "false"}
                                        aria-expanded={activeMenu === item.dropdownId ? "true" : "false"}
                                        onClick={(e) => handleNavigation(item.href, e)}
                                    >
                                        {item.label}
                                        {item.hasDropdown && <ChevronDown className={styles.dropdownArrow} />}
                                    </a>

                                    {item.hasDropdown && activeMenu === item.dropdownId && (
                                        <div className={styles.dropdown} role="menu">
                                            {dropdownItems[item.dropdownId]?.map((dropdownItem, dropdownIndex) => (
                                                <a
                                                    key={dropdownIndex}
                                                    href={dropdownItem.href}
                                                    className={styles.dropdownItem}
                                                    role="menuitem"
                                                    onClick={(e) => handleNavigation(dropdownItem.href, e)}
                                                >
                                                    <dropdownItem.icon className={styles.dropdownIcon} />
                                                    {dropdownItem.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Menu Button - ONLY WAY TO OPEN/CLOSE */}
                        <div className={styles.navRight}>
                            <button
                                className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.active : ''}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                                aria-expanded={mobileMenuOpen ? "true" : "false"}
                                type="button"
                            >
                                <span className={styles.iconContainer}>
                                    {mobileMenuOpen ? (
                                        <X className={styles.mobileMenuIcon} aria-hidden="true" />
                                    ) : (
                                        <Menu className={styles.mobileMenuIcon} aria-hidden="true" />
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* ====== COMPLETELY FIXED MOBILE MENU ====== */}
                    <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                        {navigationItems.map((item, index) => (
                            <div key={index} className={styles.mobileNavItem}>
                                {item.hasDropdown ? (
                                    <button
                                        className={styles.mobileNavLink}
                                        onClick={() => toggleMobileSubmenu(item.dropdownId)}
                                        aria-expanded={mobileSubmenuOpen[item.dropdownId] ? "true" : "false"}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            className={`${styles.mobileDropdownArrow} ${mobileSubmenuOpen[item.dropdownId] ? styles.open : ''
                                                }`}
                                        />
                                    </button>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={styles.mobileNavLink}
                                        onClick={(e) => {
                                            handleNavigation(item.href, e);
                                            // Let user close manually
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                )}

                                {/* DROPDOWN ITEMS - NO AUTO CLOSE */}
                                {item.hasDropdown && (
                                    <div className={`${styles.mobileSubMenu} ${mobileSubmenuOpen[item.dropdownId] ? styles.open : ''
                                        }`}>
                                        {dropdownItems[item.dropdownId]?.map((dropdownItem, dropdownIndex) => (
                                            <a
                                                key={dropdownIndex}
                                                href={dropdownItem.href}
                                                className={styles.mobileSubItem}
                                                onClick={(e) => {
                                                    // Handle anchor links
                                                    if (dropdownItem.href.includes('#')) {
                                                        const [path, anchor] = dropdownItem.href.split('#');

                                                        if (window.location.pathname === path) {
                                                            e.preventDefault();
                                                            const element = document.getElementById(anchor);
                                                            if (element) {
                                                                element.scrollIntoView({
                                                                    behavior: 'smooth',
                                                                    block: 'start'
                                                                });
                                                            }
                                                        }
                                                    }
                                                    // DON'T CLOSE MENU - Let user close manually
                                                }}
                                            >
                                                <dropdownItem.icon size={16} />
                                                {dropdownItem.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}


                    </div>
                </div>
            </nav>

            {/* REMOVE OVERLAY COMPLETELY - NO AUTO CLOSE */}
            {/* {mobileMenuOpen && <div className={styles.mobileOverlay} onClick={closeMobileMenu} />} */}
        </header>
    );
};

export default AppBar;
