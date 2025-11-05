import Dashboard from '../../../components/Admin/dashboard.jsx'
import styles from "../../../CSS/Admin/adminpage.module.css"
import { Routes, Route } from 'react-router-dom'

function AdminPage() {
    return(
    <>
        <div className={styles.container}>
            <Dashboard/>
           
            
        </div>
    
    
    </>
    )
}
export default AdminPage;