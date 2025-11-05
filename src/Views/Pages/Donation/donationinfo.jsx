
import { useTranslation } from 'react-i18next';
import styles from "../../../CSS/Donationpage/donationinfo.module.css"


function Donationinfo() {
    const { t } = useTranslation('donationpage');
    return (
        <>
            <div className={styles.container}>

                <h1> {t('title')}</h1>
                <h3>{t('subtitle')}</h3>
                <p className={styles.para}>{t('para')}</p>
                

                <div>
                    <h3>{t('bank.title')}</h3>
                    <div className={styles.infocard}>
                        <p>{t('bank.acname')}</p>
                        <p>{t('bank.bankname')}</p>
                        <p>{t('bank.acno')}</p>
                        <p>{t('bank.ifsc')}</p>
                        <p>{t('bank.branch')}</p>
                    </div>
                    
                </div>
            </div>

        </>
    )
}
export default Donationinfo;