import { Outlet } from "react-router-dom";
import "./Public.scss";
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Footer/Footer';

const Public = () => {
    return (
        <>
            <Navigation />
            <div className="outlet-container">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
export default Public;