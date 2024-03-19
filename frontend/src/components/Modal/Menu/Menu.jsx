import "../Modal.scss";
import "./Menu.scss";
import { publicRoute } from "../../../routes"
import { Link } from "react-router-dom";
const ModalMenu = ({ toggleMenu, isOpen }) => {
    return (
        <>
            <div className={`modal modal-menu ${isOpen ? 'open' : ''}`}>
                <div className="overlay" onClick={toggleMenu}></div>

                <div className={`modal-content menu-content ${isOpen ? 'open' : ''}`}>
                    <div className="modal-header menu-header">
                        <h2 className="modal-header-title">Menu</h2>
                        <div className="exit-button pointer hov-cl1" onClick={toggleMenu}>
                            <i className="bi-x"></i>
                        </div>
                    </div>

                    <div className="modal-body menu-body">
                        <div><Link onClick={toggleMenu} to={`${publicRoute.PUBLIC}women`}>Women</Link></div>
                        <div><Link onClick={toggleMenu} to={`${publicRoute.PUBLIC}men`}>Men</Link></div>
                        <div><Link onClick={toggleMenu} to={`${publicRoute.PUBLIC}kids`}>Kids</Link></div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default ModalMenu;