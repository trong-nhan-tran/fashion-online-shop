import "./Profile.scss";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import { useSelector } from "react-redux";
import { validateForm } from "../../../helpers/validate_form";
import { apiChangeInfor, apiChangePassword } from "../../../apis";
import { useCallback } from "react";
import { login } from "../../../store/user/userSlice";
import { useDispatch } from "react-redux";
const PersonalInfor = () => {
    const dispatch = useDispatch();
    const [passwordChange, setPasswordChange] = useState(false);
    const { current } = useSelector(state => state.user);
    const toggleOpenPasswordChange = () => {
        setPasswordChange(!passwordChange);
    };

    const [invalidFieldsChangePassword, setInvalidFieldsChangePassword] = useState([]);
    const [payloadPassword, setPayloadPassword] = useState({
        current_password: "",
        new_password: ""
    });
    
    const [invalidFieldsChangeInfor, setInvalidFieldsChangeInfor] = useState([]);
    
    

    const [payloadChangeInfor, setPayloadChangeInfor] = useState({
        first_name: "",
        last_name: "",
        phone: ""
    });
    const handleChangePassword = useCallback(async () => {
        const checkInvalids = validateForm(payloadPassword, setInvalidFieldsChangePassword);
        console.log(checkInvalids)
        if (checkInvalids === 0) {
            const response = await apiChangePassword(payloadPassword);
            if (!response.err){
                toast.success(response.mess, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });    
            }
            else{
                toast.error(response.mess, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
    }, [payloadPassword]);
    const handleChangeInfor = useCallback(async () => {
        const checkInvalids = validateForm(payloadChangeInfor, setInvalidFieldsChangeInfor);
        console.log(checkInvalids)
        if (checkInvalids === 0) {
            const response = await apiChangeInfor(payloadChangeInfor);
            if (!response.err){
                toast.success(response.mess, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });  
                //dispatch(login({ isLoggedIn: true, token: response.accessToken }));  
            }
            else{
                toast.error(response.mess, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
    }, [payloadChangeInfor]);

    return (
        <>
            <div className="top-header">
                <h2>Personal Information</h2>
            </div>
            <div className="main-info-content">
                <div className="sign-in-info">
                    <h3 className="info-header">Sign In Information</h3>
                    <div className="sign-in-info-item">
                        <div className="sign-in-info-colum">Email</div>
                        <div>{current?.email}</div>
                    </div>
                    <div className="sign-in-info-item">
                        <div className="sign-in-info-colum">Password</div>
                        <div className="password-row" onClick={toggleOpenPasswordChange}>**************<a>Change</a></div>
                    </div>

                    <div className={`sign-in-info-item password-change ${passwordChange ? 'open' : ''}`}>
                        <h3>Change Password</h3>
                        <InputField 
                            type={"password"} 
                            name={"current_password"} 
                            label={"Current Password*"}
                            nameKey={"current_password"}
                            value={payloadPassword.current_password}
                            setValue={setPayloadPassword}
                            invalidFields={invalidFieldsChangePassword}
                            setInvalidFields={setInvalidFieldsChangePassword}
                        />

                        <InputField 
                            type={"password"} 
                            name={"new_password"} 
                            label={"New Password*"}
                            nameKey={"new_password"}
                            value={payloadPassword.new_password}
                            setValue={setPayloadPassword}
                            invalidFields={invalidFieldsChangePassword}
                            setInvalidFields={setInvalidFieldsChangePassword}
                        />

                        <a className="forgot-password" href="#">Forgot Password?</a>

                        <ButtonBlack 
                            label={"Update Password"}
                            handleOnClick={handleChangePassword}
                        />
                    </div>
                </div>
                <div className="about-me-info">
                    <h3 className="info-header">About Me</h3>
                    <InputField 
                        name={"first_name"} 
                        label={"First Name*"}
                        value={payloadChangeInfor.first_name}
                        placeHolder={current?.first_name}
                        nameKey={'first_name'}
                        setValue={setPayloadChangeInfor}
                        invalidFields={invalidFieldsChangeInfor}
                        setInvalidFields={setInvalidFieldsChangeInfor}
                    />
                        

                    <InputField 
                        name={"last_name"}
                        label={"Last Name"}
                        nameKey={'last_name'}
                        placeHolder={current?.last_name}
                        value={payloadChangeInfor.last_name}
                        setValue={setPayloadChangeInfor}
                        invalidFields={invalidFieldsChangeInfor}
                        setInvalidFields={setInvalidFieldsChangeInfor}
                    />


                    <InputField 
                        name={"phone"} 
                        label={"Phone Number"}
                        nameKey={'phone'}
                        placeHolder={current?.phone}
                        value={payloadChangeInfor.phone}
                        setValue={setPayloadChangeInfor}
                        invalidFields={invalidFieldsChangeInfor}
                        setInvalidFields={setInvalidFieldsChangeInfor}
                    />

                    <ButtonBlack 
                        label={"Update Information"}
                        handleOnClick={handleChangeInfor}
                    />
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
};
export default PersonalInfor;