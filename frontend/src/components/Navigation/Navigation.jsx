import './Navigation.scss';
import ModalCart from "../Modal/Cart/Cart";
import ModalSearch from "../Modal/Search/Search";
import ModalLogin from "../Modal/Login/Login"
import ModalMenu from "../Modal/Menu/Menu";
import AccountPopover from "../Modal/AccountPopover/AccountPopover"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from '../../store/user/asyncActions';
import { logout } from "../../store/user/userSlice";
import { publicRoute } from '../../routes';

const Navigation = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, current } = useSelector(state => state.user);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCurrent())
        }
    }, [dispatch, isLoggedIn])
    const [modal, setModal] = useState({
        search: false,
        cart: false,
        menu: false,
        account: false,
        login: false
    });

    const toggleModal = (modalName) => {
        setModal({
            ...modal,
            [modalName]: !modal[modalName]
        });
    }
    const handleLogout = () => {

        dispatch(logout());
        window.location.reload();

    }
    return (
        <>
            <div className="nav-bar">
                <div className='nav-bar-item'>
                    <div className="icon-btn btn-menu" onClick={() => toggleModal('menu')}>
                        <i className='bi-list'></i>
                    </div>
                    <div className="icon-btn btn-search" onClick={() => toggleModal('search')}>
                        <i className='bi-search'></i>
                    </div>
                </div>

                <div className='nav-bar-item'>
                    <Link to="/" className="logo-brand">One More Style</Link>
                </div>

                <div className='nav-bar-item'>
                    <div className="icon-btn btn-account" onClick={() => toggleModal('account')}>
                        <i className='bi-person'></i>
                        <AccountPopover
                            userName={current?.first_name}
                            toggleMenu={() => toggleModal('account')} isOpen={modal.account}
                            handleLogout={handleLogout}
                        />
                    </div>
                    {isLoggedIn
                        ? <div className='icon-btn btn-bag' onClick={() => toggleModal('cart')}>
                            <i className='bi-handbag'></i>
                            <i className='icon-bag-noti'>3</i>
                        </div>

                        : <div className='icon-btn btn-bag' onClick={() => toggleModal('login')}>
                            <i className='bi-handbag'></i>
                            <i className='icon-bag-noti'>3</i>
                        </div>
                    }
                </div>
            </div>
            <ModalSearch toggleSearch={() => toggleModal('search')} isOpen={modal.search} />
            <ModalMenu toggleMenu={() => toggleModal('menu')} isOpen={modal.menu} />
            {isLoggedIn ===false && <ModalLogin toggleLogin={() => toggleModal('login')} isOpen={modal.login} />}
            { isLoggedIn && <ModalCart toggleCart={() => toggleModal('cart')} isOpen={modal.cart} /> }
        </>
    )
};

export default Navigation;