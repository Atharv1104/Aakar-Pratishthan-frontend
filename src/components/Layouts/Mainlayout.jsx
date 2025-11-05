import { Outlet } from "react-router-dom";
import AppBar from "./Appbar.jsx";
import Footer from "./Footer.jsx";

const MainLayout = () => {
    {
        return (
            <>
                <AppBar />
                <Outlet />
                <Footer />
            </>
        )
    }
}
export default MainLayout;