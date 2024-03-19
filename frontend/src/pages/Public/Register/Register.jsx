import "./Register.scss";
import { useNavigate, Link } from "react-router-dom";
import InputField from '../../../components/Input/InputField';
import ButtonBlack from '../../../components/Button/ButtonBlack';
import { useCallback, useState } from "react";
import { apiRegister } from "../../../apis";
import { publicRoute } from "../../../routes";
import { validateForm } from "../../../helpers/validate_form";
import Swal from "sweetalert2";
const Register = () => {
    const navigate = useNavigate()
    const [payload, setPayload] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });
    const [invalidFields, setInvalidFields] = useState([]);

    const handleSubmit = useCallback(async () => {
        const checkInvalids = validateForm(payload, setInvalidFields);
        if (checkInvalids === 0){
            const response = await apiRegister(payload);
            if (!response.err) { 
                navigate(`/${publicRoute.LOGIN}`)
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
                    <h1 className="register-header-title">Create an Account</h1>
                </div>

                <div className="register-body">
                    <div >
                        <InputField
                            label={"First Name*"}
                            placeHolder={"First Name"}
                            name={"first_name"}
                            value={payload.first_name}
                            setValue={setPayload}
                            nameKey="first_name"
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <InputField
                            label={"Last Name*"}
                            placeHolder={"Last Name"}
                            name={"last_name"}
                            value={payload.last_name}
                            setValue={setPayload}
                            nameKey="last_name"
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
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
                        <div className="policy">
                            <input className="check-box" type="checkbox" value={true} name="" id="policy" />
                            <label htmlFor="">I agree <a>policy</a> </label>
                        </div>
                        <ButtonBlack
                            label={"Create an Account"}
                            handleOnClick={handleSubmit}
                        />
                        <div className="account-question">
                            Already have an account?  <Link to="/login">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;