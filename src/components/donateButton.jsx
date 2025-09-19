import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Donate() {
    const {t}=useTranslation('common');
    const navigate= useNavigate();
    const handleSubmit=()=>{
        navigate('/donations');
    }
    return (
        <>
            <button style={
                {
                "background-color":"#FDD831",
                "color":"#012D58",
                "font-weight":"600",
                "border-radius":"1rem",
                "height":"2.3rem",
                "width":"8rem",
                "padding":"0.5rem",
                "display":"flex",
                "justifyContent":"center",
                "align-items":"Center",
                "margin":"1rem 1rem 0 0"
                
                }
                } onClick={handleSubmit}>
                {t('donate')}
                
            </button>

        </>
    )
}
export default Donate;