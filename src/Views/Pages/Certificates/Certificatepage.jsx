import React from 'react';
import { certificates } from '../../../components/Data/Certificatesdata';
import styles from '../../../CSS/Certificates/certificates.module.css';

export default function Certificates() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Our Certificates</h1>
      <div className={styles.list}>
        {certificates.map(cert => (
          <div key={cert.id} className={styles.card}>
            <span className={styles.title}>{cert.title}</span>
            <button
              className={styles.openBtn}
              onClick={() => window.open(cert.pdfUrl, '_blank')}
            >
              Open PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
