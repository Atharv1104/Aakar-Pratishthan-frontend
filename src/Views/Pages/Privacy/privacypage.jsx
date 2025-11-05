import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import styles from '../../../CSS/Privacy/privacy.module.css';

// Helper component for Tab Panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`legal-tabpanel-${index}`}
      aria-labelledby={`legal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function LegalPage() {
  const { t } = useTranslation('privacypage');
  const [value, setValue] = useState(0); // 0 for Privacy, 1 for Terms

  // This will check for a URL hash (e.g., /legal#terms) and switch to that tab
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#terms') {
      setValue(1);
    } else {
      setValue(0);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Update the URL hash without reloading the page
    window.history.pushState(null, null, newValue === 1 ? '#terms' : '#privacy');
  };

  return (
    <Paper elevation={3} className={styles.pageContainer}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="Privacy and Terms tabs"
          variant="fullWidth"
        >
          <Tab label={t('privacy.headers.mainheader')} id="legal-tab-0" />
          <Tab label={t('terms.headers.mainheader')} id="legal-tab-1" />
        </Tabs>
      </Box>

      {/* Privacy Policy Panel */}
      <TabPanel value={value} index={0}>
        <div className={styles.content}>
          <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>Last updated: November 5, 2025</Typography>

          <h2>{t('privacy.headers.intro')}</h2>
          <p>{t('privacy.p_intro')}</p>

          <h2>{t('privacy.headers.h1')}</h2>
          <p>{t('privacy.p1')}</p>

          <h2>{t('privacy.headers.h2')}</h2>
          <ul>
            <li dangerouslySetInnerHTML={{ __html: t('privacy.p2.li1') }} />
            <li dangerouslySetInnerHTML={{ __html: t('privacy.p2.li2') }} />
            <li dangerouslySetInnerHTML={{ __html: t('privacy.p2.li3') }} />
            <li dangerouslySetInnerHTML={{ __html: t('privacy.p2.li4') }} />
          </ul>

          <h2>{t('privacy.headers.h3')}</h2>
          <p>{t('privacy.p3')}</p>

          <h2>{t('privacy.headers.h4')}</h2>
          <p>{t('privacy.p4')}</p>

          <h2>{t('privacy.headers.h5')}</h2>
          <p>{t('privacy.p5')}</p>

          <h2>{t('privacy.headers.h6')}</h2>
          <p>{t('privacy.p6')}</p>

          <h2>{t('privacy.headers.h7')}</h2>
          <p>{t('privacy.p7')}</p>

          <h2>{t('privacy.headers.h8')}</h2>
          <p>{t('privacy.p8')}</p>

          <h2>{t('privacy.headers.h9')}</h2>
          <p>{t('privacy.p9')}</p>
          <div className={styles.addressBlock}>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p9_address.l1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p9_address.l2') }} />
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p9_address.l3') }} />
          </div>

          <h2>{t('privacy.headers.h10')}</h2>
          <p>{t('privacy.p10')}</p>

          <h2>{t('privacy.headers.h11')}</h2>
          <p>{t('privacy.p11')}</p>
        </div>
      </TabPanel>

      {/* Terms of Use Panel */}
      <TabPanel value={value} index={1}>
        <div className={styles.content}>
          <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>Last updated: November 5, 2025</Typography>
        
          <h2>{t('terms.headers.intro')}</h2>
          <p>{t('terms.p_intro')}</p>

          <h2>{t('terms.headers.h1')}</h2>
          <p>{t('terms.p1')}</p>
        
          <h2>{t('terms.headers.h2')}</h2>
          <p>{t('terms.p2')}</p>
        
          <h2>{t('terms.headers.h3')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('terms.p3') }} />
        
          <h2>{t('terms.headers.h4')}</h2>
          <p>{t('terms.p4')}</p>
        
          <h2>{t('terms.headers.h5')}</h2>
          <p>{t('terms.p5')}</p>
        
          <h2>{t('terms.headers.h6')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('terms.p6') }} />
        
          <h2>{t('terms.headers.h7')}</h2>
          <p>{t('terms.p7')}</p>
        
          <h2>{t('terms.headers.h8')}</h2>
          <p>{t('terms.p8')}</p>
        
          <h2>{t('terms.headers.h9')}</h2>
          <p>{t('terms.p9')}</p>
          <div className={styles.addressBlock}>
            <p dangerouslySetInnerHTML={{ __html: t('terms.p9_address.l1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('terms.p9_address.l2') }} />
            <p dangerouslySetInnerHTML={{ __html: t('terms.p9_address.l3') }} />
          </div>
        
          <h2>{t('terms.headers.h10')}</h2>
          <p>{t('terms.p10')}</p>
        
          <h2>{t('terms.headers.h11')}</h2>
          <p>{t('terms.p11')}</p>
        </div>
      </TabPanel>
    </Paper>
  );
}

export default LegalPage;