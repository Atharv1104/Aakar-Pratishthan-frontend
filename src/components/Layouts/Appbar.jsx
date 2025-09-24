
// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import Box from '@mui/material/Box';
// import {
//     Menu,
//     ChevronDown,
//     X,
//     BookOpen,
// } from 'lucide-react';
// import LanguageToggle from "../languageToggle.jsx"; 
// import Donate from "../donateButton.jsx";
// import styles from './AppBar.module.css';

// const AppBar = () => {
//     const { t } = useTranslation('common');
//     const [activeMenu, setActiveMenu] = useState(null);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

//     // Handle scroll effect and mobile detection
//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 10);
//         };

//         const handleResize = () => {
//             const mobile = window.innerWidth <= 1024;
//             setIsMobile(mobile);
            
//             // Close mobile menu if switching to desktop
//             if (!mobile && mobileMenuOpen) {
//                 setMobileMenuOpen(false);
//                 setMobileSubmenuOpen({});
//             }
//         };

//         // Initial setup
//         handleResize();
        
//         window.addEventListener('scroll', handleScroll);
//         window.addEventListener('resize', handleResize);
        
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [mobileMenuOpen]);

//     // Prevent body scroll when mobile menu is open
//     useEffect(() => {
//         if (mobileMenuOpen) {
//             document.body.style.overflow = 'hidden';
//             document.body.style.touchAction = 'none';
//         } else {
//             document.body.style.overflow = 'unset';
//             document.body.style.touchAction = 'auto';
//         }
        
//         return () => {
//             document.body.style.overflow = 'unset';
//             document.body.style.touchAction = 'auto';
//         };
//     }, [mobileMenuOpen]);

//     const navigationItems = [
//         { label: t('navigation.home'), href: '/' },
//         { label: t('navigation.whoweare'), href: '#', hasDropdown: true, dropdownId: 1 },
//         { label: t('navigation.whatwedo'), href: '/programs'}, 
//         { label: t('navigation.newsandupdates'), href: '/news' },
//         { label: t('navigation.contact'), href: '/contact' },
//         { label: t('navigation.adminlogin'), href: '/admin' },
//     ];

//     const dropdownItems = {
//         1: [
//             { label: t('navigation.aboutus'), href: '/about-us', icon: BookOpen },
//             { label: t('navigation.ourteam'), href: '/about-us#team', icon: BookOpen },
//             { label: t('navigation.missionvision'), href: '/about-us#mission-vision', icon: BookOpen }
//         ],
       
//     };

//     // FIXED SMOOTH SCROLL FUNCTION
//     const handleNavigation = (href, event) => {
//         if (href.includes('#')) {
//             const [path, anchor] = href.split('#');
//             const currentPath = window.location.pathname;
            
//             // Same page scrolling
//             if (currentPath === path || path === '') {
//                 event.preventDefault();
//                 setTimeout(() => {
//                     const element = document.getElementById(anchor);
//                     if (element) {
//                         element.scrollIntoView({
//                             behavior: 'smooth',
//                             block: 'start'
//                         });
//                     }
//                 }, 100);
//                 return;
//             }
            
//             // Different page navigation + scrolling
//             event.preventDefault();
//             window.location.href = href;
//             return;
//         }
//     };

//     const toggleMobileSubmenu = (index) => {
//         setMobileSubmenuOpen(prev => ({
//             ...prev,
//             [index]: !prev[index]
//         }));
//     };

//     const handleMenuHover = (index) => {
//         setActiveMenu(index);
//     };

//     const handleMenuLeave = () => {
//         setActiveMenu(null);
//     };

//     // FIXED MANUAL CLOSE FUNCTION
//     const closeMobileMenu = () => {
//         setMobileMenuOpen(false);
//         setMobileSubmenuOpen({});
//     };

//     return (
//         <header className={`${styles.container} ${isScrolled ? styles.scrolled : ''}`}>
//             {/* Top Bar */}
//             <div className={styles.topBar}>
//                 <div className={styles.topBarInner}>
//                     <div className={styles.topBarRight}>
//                         <Donate />
//                         <figure className={styles.socialIcons}>
//                             <a href="#" className={styles.socialIcon} aria-label="Facebook">
//                                 <img src="/icons/facebook.svg" alt="Facebook" className={styles.iconcolor} />
//                             </a>
//                             <a href="#" className={styles.socialIcon} aria-label="X">
//                                 <img src="/icons/x.svg" alt="X" className={styles.iconcolor} />
//                             </a>
//                             <a href="#" className={styles.socialIcon} aria-label="Instagram">
//                                 <img src="/icons/instagram.svg" alt="Instagram" className={styles.iconcolor} />
//                             </a>

//                         </figure>
//                         <Box sx={{ ml: 2 }}>
//                             <LanguageToggle />
//                         </Box>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Navigation */}
//             <nav className={styles.mainNav} role="navigation">
//                 <div className={styles.mainNavInner}>
//                     <div className={styles.navContainer}>
//                         {/* Logo Section */}
//                         <div className={styles.logoSection}>
//                             <figure className={styles.logoContainer}>
//                                 <img
//                                     src="/logo/Logo.jpg"
//                                     alt="Aakar Pratishthan Logo"
//                                     className={styles.logoImage}
//                                 />
//                             </figure>
//                             <figure className={styles.logoTextSection}>
//                                 <img
//                                     src="/logo/Aakar_text_transperent.jpg"
//                                     alt="Aakar Pratishthan Text"
//                                     className={styles.logoTextImage}
//                                 />
//                                 <p className={styles.companyName}>पोलादपूर, जि. रायगड</p>
//                             </figure>
//                         </div>

//                         {/* Desktop Navigation */}
//                         <div className={styles.navigation}>
//                             {navigationItems.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     className={styles.navItem}
//                                     onMouseEnter={() => item.hasDropdown && handleMenuHover(item.dropdownId)}
//                                     onMouseLeave={handleMenuLeave}
//                                 >
//                                     <a
//                                         href={item.href}
//                                         className={styles.navLink}
//                                         aria-haspopup={item.hasDropdown ? "true" : "false"}
//                                         aria-expanded={activeMenu === item.dropdownId ? "true" : "false"}
//                                         onClick={(e) => handleNavigation(item.href, e)}
//                                     >
//                                         {item.label}
//                                         {item.hasDropdown && <ChevronDown className={styles.dropdownArrow} />}
//                                     </a>

//                                     {item.hasDropdown && activeMenu === item.dropdownId && (
//                                         <div className={styles.dropdown} role="menu">
//                                             {dropdownItems[item.dropdownId]?.map((dropdownItem, dropdownIndex) => (
//                                                 <a
//                                                     key={dropdownIndex}
//                                                     href={dropdownItem.href}
//                                                     className={styles.dropdownItem}
//                                                     role="menuitem"
//                                                     onClick={(e) => handleNavigation(dropdownItem.href, e)}
//                                                 >
//                                                     <dropdownItem.icon className={styles.dropdownIcon} />
//                                                     {dropdownItem.label}
//                                                 </a>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Mobile Menu Button  */}
//                         <div className={styles.navRight}>
//                             <button
//                                 className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.active : ''}`}
//                                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                                 aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
//                                 aria-expanded={mobileMenuOpen ? "true" : "false"}
//                                 type="button"
//                             >
//                                 <span className={styles.iconContainer}>
//                                     {mobileMenuOpen ? (
//                                         <X className={styles.mobileMenuIcon} aria-hidden="true" />
//                                     ) : (
//                                         <Menu className={styles.mobileMenuIcon} aria-hidden="true" />
//                                     )}
//                                 </span>
//                             </button>
//                         </div>
//                     </div>

//                     {/* ======MOBILE MENU ====== */}
//                     <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
//                         {navigationItems.map((item, index) => (
//                             <div key={index} className={styles.mobileNavItem}>
//                                 {item.hasDropdown ? (
//                                     <button
//                                         className={styles.mobileNavLink}
//                                         onClick={() => toggleMobileSubmenu(item.dropdownId)}
//                                         aria-expanded={mobileSubmenuOpen[item.dropdownId] ? "true" : "false"}
//                                     >
//                                         {item.label}
//                                         <ChevronDown
//                                             className={`${styles.mobileDropdownArrow} ${mobileSubmenuOpen[item.dropdownId] ? styles.open : ''
//                                                 }`}
//                                         />
//                                     </button>
//                                 ) : (
//                                     <a
//                                         href={item.href}
//                                         className={styles.mobileNavLink}
//                                         onClick={(e) => {
//                                             handleNavigation(item.href, e);
//                                             closeMobileMenu(); 
//                                         }}
//                                     >
//                                         {item.label}
//                                     </a>
//                                 )}

//                                 {/* DROPDOWN ITEMS  */}
//                                 {item.hasDropdown && (
//                                     <div className={`${styles.mobileSubMenu} ${mobileSubmenuOpen[item.dropdownId] ? styles.open : ''
//                                         }`}>
//                                         {dropdownItems[item.dropdownId]?.map((dropdownItem, dropdownIndex) => (
//                                             <a
//                                                 key={dropdownIndex}
//                                                 href={dropdownItem.href}
//                                                 className={styles.mobileSubItem}
//                                                 onClick={(e) => {
//                                                     // Handle anchor links
//                                                     handleNavigation(dropdownItem.href, e);
//                                                     closeMobileMenu(); 
//                                                 }}
//                                             >
//                                                 <dropdownItem.icon className={styles.dropdownIcon} />
//                                                 {dropdownItem.label}
//                                             </a>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </nav>

            
//         </header>
//     );
// };

// export default AppBar;



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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    // Handle scroll effect and mobile detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const handleResize = () => {
            const mobile = window.innerWidth <= 1024;
            setIsMobile(mobile);
            
            // Close mobile menu if switching to desktop
            if (!mobile && mobileMenuOpen) {
                setMobileMenuOpen(false);
                setMobileSubmenuOpen({});
            }
        };

        // Initial setup
        handleResize();
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [mobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
        };
    }, [mobileMenuOpen]);

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

    // FIXED SMOOTH SCROLL FUNCTION
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
            window.location.href = href;
            return;
        }
    };

    const toggleMobileSubmenu = (index) => {
        setMobileSubmenuOpen(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleMenuHover = (index) => {
        // FIXED: Only activate hover on desktop
        if (!isMobile) {
            setActiveMenu(index);
        }
    };

    const handleMenuLeave = () => {
        // FIXED: Only activate hover on desktop
        if (!isMobile) {
            setActiveMenu(null);
        }
    };

    // FIXED MANUAL CLOSE FUNCTION
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setMobileSubmenuOpen({});
    };

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
                                            closeMobileMenu(); 
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
                                                    handleNavigation(dropdownItem.href, e);
                                                    closeMobileMenu(); 
                                                }}
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
                </div>
            </nav>
            {/* REMOVE OVERLAY COMPLETELY - NO AUTO CLOSE */}
            {/* {mobileMenuOpen && <div className={styles.mobileOverlay} onClick={closeMobileMenu} />} */}
        </header>
    );
};

export default AppBar;