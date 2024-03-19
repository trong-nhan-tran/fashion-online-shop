import "./MemberSidebar.scss"
import { NavLink } from "react-router-dom";
import { memberRoute } from "../../../routes";
import { useSelector } from "react-redux/es/hooks/useSelector";
const LeftNav = () => {
    const { isLoggedIn, current } = useSelector(state => state.user);
    return (
        <>
            <h1 className="hi-name">Hi, {current?.first_name}</h1>
            <div className="nav-container">
                <div className="nav-item">
                    <NavLink to={memberRoute.PROFILE}>
                        Personal Information
                    </NavLink>
                </div>
                <div className="nav-item">
                    <NavLink to={memberRoute.ORDERS}>
                        Orders
                    </NavLink>
                </div>
                <div className="nav-item">
                    <NavLink to={memberRoute.CART}>
                        Shopping Bag
                    </NavLink>
                </div>
            </div>

        </>
    )
};
export default LeftNav;