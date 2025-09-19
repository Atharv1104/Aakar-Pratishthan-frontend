
import { useTranslation } from 'react-i18next';
import styles from "../../../CSS/Donationpage/donationinfo.module.css"


function Donationinfo() {
    const { t } = useTranslation('donationpage');
    return (
        <>
            <h3>{t('donationinfo.title')}</h3>
            <h5>{t('donationinfo.subtitle')}</h5>

            <div>
                <h3>{t('bank.title')}</h3>
                <div className={styles.infocard}>
                    <p>{t('bank.acname')}</p>
                    <p>{t('bank.bankname')}</p>
                    <p>{t('bank.acno')}</p>
                    <p>{t('bank.ifsc')}</p>
                    <p>{t('bank.branch')}</p>
                </div>
                <h2>{t('contact.title')}</h2>

                <div className={styles.contactcards}>
                    <div className={styles.card}>   
                        <p>{t('contact.person1.Name')}</p>
                        <p>{t('contact.person1.Email')}</p>
                        <p>{t('contact.person1.Mobile')}</p>
                    </div>
                    <div className={styles.card}>
                         <p>{t('contact.person2.Name')}</p>
                        <p>{t('contact.person2.Email')}</p>
                        <p>{t('contact.person2.Mobile')}</p>
                    </div>
                    <div className={styles.card}>
                        <p>{t('contact.person3.Name')}</p>
                        <p>{t('contact.person3.Email')}</p>
                        <p>{t('contact.person3.Mobile')}</p>
                    </div>
                    <div className={styles.card}>
                         <p>{t('contact.person4.Name')}</p>
                        <p>{t('contact.person4.Email')}</p>
                        <p>{t('contact.person4.Mobile')}</p>
                    </div>
                    <div className={styles.card}>
                         <p>{t('contact.person5.Name')}</p>
                        <p>{t('contact.person5.Email')}</p>
                        <p>{t('contact.person5.Mobile')}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Donationinfo;