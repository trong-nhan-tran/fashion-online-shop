import "../Register/Register.scss";
import "./Login.scss"
import { Link, useNavigate } from "react-router-dom";
import InputField from '../../../components/Input/InputField';
import ButtonBlack from '../../../components/Button/ButtonBlack';
import { useCallback, useState } from "react";
import { apiLogin } from "../../../apis";
import { login } from "../../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { publicRoute, adminRoute } from "../../../routes";
import { validateForm } from "../../../helpers/validate_form";
import Swal from "sweetalert2";


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    });

    const [invalidFields, setInvalidFields] = useState([]);

    const handleSubmit = useCallback(async () => {
        const checkInvalids = validateForm(payload, setInvalidFields);
        if (checkInvalids === 0){
            const response = await apiLogin(payload);
            if (!response.err ) { // Kiểm tra nếu đăng nhập thành công
                dispatch(login({ isLoggedIn: true, token: response.accessToken }));
                window.location.reload()

            }

            else{
                Swal.fire(response.mess)
            }
        }
    }, [payload]);
    return (
        <div className="register-container">
            <div className="register-content">
                <div className="register-header">
                    <h1 className="register-header-title">Sign In</h1>
                </div>

                <div className="register-body">
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
                        Don't have an account?  <Link to="/register">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;            