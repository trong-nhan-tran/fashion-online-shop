import "../Modal.scss";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Input/InputField";
import ButtonBlack from "../../Button/ButtonBlack";
import { useCallback, useState } from "react";
import { apiLogin } from "../../../apis";
import { login } from "../../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { publicRoute, adminRoute } from "../../../routes";
const ModalLogin = ({ toggleLogin, isOpen }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    });
    const [invalidFields, setInvalidFields] = useState([]);


    const handleSubmit = useCallback(async()=>{
        const response = await apiLogin(payload);
        if (response.err === 0) { 
                dispatch(login({isLoggedIn : true, token: response.accessToken}));
                window.location.reload(); 

            
        }
    }, [payload]);
    

    return (
        <>
            <div className={`modal modal-login ${isOpen ? 'open' : ''}`}>
                <div className="overlay" onClick={toggleLogin}></div>

                <div className={`modal-content login-content ${isOpen ? 'open' : ''}`}>
                    <div className="modal-header login-header">
                        <h2 className="modal-header-title">Sign In</h2>
                        <div className="exit-button pointer hov-cl1" onClick={toggleLogin}>
                            <i className="bi-x"></i>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div >
                            <InputField
                                label={"Email*"}
                                placeHolder={"Email"}
                                type={"email"}
                                name={"email"}
                                value={payload.email}
                                setValue={setPayload}
                                nameKey="email"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />

                            <InputField
                                label={"Password*"}
                                placeHolder={"Password"}
                                type={"password"}
                                name={"password"}
                                value={payload.password}
                                setValue={setPayload}
                                nameKey="password"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            
                            <div className="remember-forgot">
                                <div className="remember">
                                    <input className="check-box" type="checkbox" value={true} name="" id="" />
                                    <label htmlFor="">Remember Me</label>
                                </div>

                                <a className="forgot" href="#">Forgot Password?</a>
                            </div>

                            <ButtonBlack 
                                label={"Sign In"}
                                handleOnClick={handleSubmit}
                            />
                        </div>

                        <div className="account-question">
                            Don't have an account?  <Link onClick={toggleLogin} to="/register">Create Account</Link>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ModalLogin;