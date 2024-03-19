import "./Member.scss";
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Footer/Footer';
import MemberSidebar from "../../../components/Sidebar/MemberSidebar/MemberSidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publicRoute } from "../../../routes";
import { useEffect } from "react";
const MemberLayout = () => {
    const { isLoggedIn } = useSelector(state => state.user);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isLoggedIn) {
            navigate(`${publicRoute.PUBLIC}${publicRoute.LOGIN}`)
        }

    }, [isLoggedIn])

    return (
        <>
            <Navigation></Navigation>
            <div className="profile-container">
                <div className="left-nav">
                    <MemberSidebar />
                </div>
                <div className="right-content">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
};
export default MemberLayout;