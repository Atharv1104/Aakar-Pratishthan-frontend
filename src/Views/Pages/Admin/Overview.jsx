
import styles from "../../../CSS/Admin/Overview.module.css"
function Overview(){
    return(
    <>
    <main>
        <div>
            {/* Desktop Navigation */}
            <aside className={styles.desktopnav}>
                <header>
                <h3>Navigation</h3>
                </header>
            </aside>
            <div>
                <p>Main content</p>
            </div>
            {/* Mobile navigation */}
            
            
        </div>
    </main>
    </>
    )
}
export default Overview