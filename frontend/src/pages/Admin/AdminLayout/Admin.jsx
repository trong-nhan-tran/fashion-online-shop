import "./Admin.scss"
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar/AdminSidebar";
import AdminHeader from "../../../components/TopHeader/AdminHeader";
import { useSelector } from "react-redux";
import { publicRoute } from "../../../routes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrent } from "../../../store/user/asyncActions";
const Admin = () =>{
    const { isLoggedIn, current } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoggedIn){
            navigate(`${publicRoute.PUBLIC}${publicRoute.LOGIN}`);
        }
        if(isLoggedIn) {
            dispatch(getCurrent())
        };
        
    }, [isLoggedIn])

    useEffect(()=>{
        
        if(current?.role_id != "R1"){
            navigate(`${publicRoute.PUBLIC}${publicRoute.LOGIN}`);
        }

    }, [current])
    return(
        <>
            <AdminHeader admin_name={current?.first_name + " " + current?.last_name} admin_email={current?.email}></AdminHeader>
            <div className="admin-body">
                <AdminSidebar/>

                <div className="manager-main-content">
                    <Outlet></Outlet>
                </div>

            </div>
        </>
    )
};

export default Admin;