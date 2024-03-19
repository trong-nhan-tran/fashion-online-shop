import "./AccountPopover.scss";
import { memberRoute, publicRoute } from "../../../routes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';

const AccountPopover = ({ userName, toggleAccount, handleLogout, isOpen }) => {

    
    return (
        <>
            <div className={`account-popover ${isOpen ? 'open' : ''}`}>
                {userName
                    ? <div className="account-popover-content">
                        <div className="popover-content-header">Hi, {userName}</div>
                        <div className="popover-content-item" ><Link to={"/member/"+ memberRoute.PROFILE}>Personal Information</Link></div>
                        <div className="popover-content-item" ><Link to={"/member/"+ memberRoute.ORDERS}>Orders</Link></div>
                        <div className="popover-content-item sign-out-btn" onClick={handleLogout} >Sign Out</div>

                    </div>

                    : <div className="account-popover-content">
                        <div className="popover-content-item" ><Link to={`${publicRoute.PUBLIC}${publicRoute.LOGIN}`}>Sign In</Link></div>
                        <div className="popover-content-item" ><Link to={`${publicRoute.PUBLIC}${publicRoute.REGISTER}`}>Create Account</Link></div>
                    </div>
                }

            </div>
        </>
    )
};

export default AccountPopover;