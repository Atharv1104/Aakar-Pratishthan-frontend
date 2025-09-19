
import React, { useEffect, useState } from 'react';
import { Calendar, Users, Heart, Award, Target, BookOpen } from 'lucide-react';
import Styles from "../../../CSS/Aboutpage/Hero.module.css";
import { useTranslation } from 'react-i18next';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation('aboutpage');
    // HANDLE ANCHOR SCROLLING ON PAGE LOAD
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);

        // Check if there's an anchor in the URL
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.slice(1)); // Remove # from hash
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 500); // Wait for page to load
            }
        }

        return () => clearTimeout(timer);
    }, []);

    const achievements = [
        {
            icon: Calendar,
            labelKey: 'achievements.founded.label',
            valueKey: 'achievements.founded.value'
        },
        {
            icon: Users,
            labelKey: 'achievements.teammembers.label',
            valueKey: 'achievements.teammembers.value'
        },
        {
            icon: Heart,
            labelKey: 'achievements.impact.label',
            valueKey: 'achievements.impact.value'
        },
        {
            icon: Award,
            labelKey: 'achievements.programs.label',
            valueKey: 'achievements.programs.value'
        }
    ];

   

    return (
        <main className={Styles.about_container}>
            {/* Hero Section */}
            <section className={`${Styles.hero_section} ${isVisible ? Styles.fade_in : ''}`}>
                <div className={Styles.hero_content}>
                    <div className={`${Styles.hero_text} ${Styles.slide_in_left}`}>
                        <span className={Styles.hero_badge}>{t('badge')}</span>
                        <h1>{t('hero.title')}</h1>
                        <h2>{t('hero.subtitle')}</h2>

                        <div className={Styles.hero_description}>
                            <p>
                                {t('hero.description')}
                            </p>



                            <p className={Styles.mission_statement}>
                                <strong>{t('hero.calltoaction')}</strong>
                            </p>
                        </div>

                        <div className={Styles.cta_buttons}>
                            <button
                                className={Styles.primary_button}
                                onClick={() => {
                                    const teamSection = document.getElementById('team');
                                    if (teamSection) {
                                        teamSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                <Users size={20} />
                                {t('hero.teambutton')}
                            </button>

                        </div>
                    </div>

                    <figure className={`${Styles.hero_image} ${Styles.slide_in_right}`}>
                        <img
                            src="/logo/logo_slogan.png"
                            alt="|| सेवा अस्माकम् धर्मः ||"
                            loading="lazy"
                        />
                        {/* <div className={Styles.image_overlay}>
                            <div className={Styles.overlay_stats}>
                                <div className={Styles.overlay_stat}>
                                    <span className={Styles.stat_number}>2+</span>
                                    <span className={Styles.stat_label}>Years of Impact</span>
                                </div>
                                <div className={Styles.overlay_stat}>
                                    <span className={Styles.stat_number}>5+</span>
                                    <span className={Styles.stat_label}>Communities</span>
                                </div>
                            </div>
                        </div> */}
                    </figure>
                </div>
            </section>

            {/* Achievements Section */}
            <section className={Styles.achievements_section}>
                <h3>{t('hero.journy')}</h3>
                <div className={Styles.achievements_grid}>
                    {achievements.map((achievement, index) => {
                        const IconComponent = achievement.icon;
                        return (
                            <div key={index} className={Styles.achievement_card}>
                                <div className={Styles.achievement_icon}>
                                    <IconComponent size={32} />
                                </div>
                                <div className={Styles.achievement_content}>
                                    <span className={Styles.achievement_value}>{t(achievement.labelKey)}</span>
                                    <span className={Styles.achievement_label}>{t(achievement.valueKey)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Mission & Vision Section - ADD ID FOR ANCHOR */}
            <section id="mission-vision" className={Styles.values_section}>
                <h3 className={Styles.header}>
                    {t('missionvision.title')}</h3>
                
                <p className={Styles.mission}>
                    {t('missionvision.mission')}
                </p>
                <p className={Styles.mission}>
                    {t('missionvision.vision')}
                </p>
            </section>
        </main>
    );
}

export default Hero;
