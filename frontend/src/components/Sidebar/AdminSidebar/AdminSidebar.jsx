import "./AdminSidebar.scss"
import { NavLink } from "react-router-dom";
import { adminRoute } from "../../../routes";

const SideBar = () => {

    return (
        <div className="sidebar-admin">
            <NavLink className="sidebar-body-item" to={adminRoute.ORDER_MANAGER}>
                <i className="bi-cart-dash-fill"></i>
                <span className="sidebar-body-item-title">Order</span>
            </NavLink>
            <NavLink className="sidebar-body-item" to={adminRoute.PRODUCT_MANAGER}>
                <i className="bi-archive-fill"></i>
                <span className="sidebar-body-item-title" >Product</span>
            </NavLink>
            <NavLink className="sidebar-body-item" to={adminRoute.USER_MANAGER}>
                <i className="bi-person-lines-fill"></i>
                <span className="sidebar-body-item-title">User</span>
            </NavLink>
        </div>


    );
};

export default SideBar;