import "./AdminHeader.scss";
import { useState } from "react";
const AdminHeader = ({admin_name, admin_email}) => {
    const [showMenuSetting, setShowMenuSetting] = useState(false);

    const toggleShowMenuSetting = () => {
        setShowMenuSetting(!showMenuSetting);
    }
    return (
        <div className="admin-header">
            <div className="brand-logo">ONE MORE STYLE ADMIN</div>
            <div className="admin-account-container">
                <div className="info-admin">
                    <div className="info-admin-name">{admin_name}</div>
                    <div className="info-admin-email">{admin_email}</div>
                </div>
                <img className="avatar" src="/images/avatar/avatar-admin.jpg" alt="" />

            </div>
        </div>
    )
};

export default AdminHeader;