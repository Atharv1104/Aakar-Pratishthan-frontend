import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "../../../CSS/Aboutpage/Ourteam.module.css";
import Teamdata from "../../../components/Data/Teamdata";

function OurTeam() {
  const { t } = useTranslation('aboutpage');
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  // Dynamic cards per slide based on screen size
  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      setCardsPerSlide(width >= 992 ? 4 : width >= 768 ? 2 : 1);
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  // Group team data into slides
  const slides = Teamdata.reduce((acc, cur, i) => {
    const slideIndex = Math.floor(i / cardsPerSlide);
    if (!acc[slideIndex]) acc[slideIndex] = [];
    acc[slideIndex].push(cur);
    return acc;
  }, []);

  return (
    <main id="team" className={styles.Container}>
      <h2>{t('team')}</h2>
      <Carousel interval={5000} indicators controls>
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <div className={styles.TeamContainer}>
              {slide.map((item, cardIdx) => (
                <Card key={cardIdx} className={styles.TeamCard}>
                  <Card.Img variant="top" src={item.img} alt={item.alt} className={styles.carouselImage} />
                  <Card.Body>
                    <Card.Title>{t(`members.${item.id}.name`)}</Card.Title>
                    <div className={styles.cardrole}>{t(`members.${item.id}.role`)}</div>
                    <div className={styles.cardcaption}>{t(`members.${item.id}.information`)}</div>
                    
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </main>
  );
}

export default OurTeam;
