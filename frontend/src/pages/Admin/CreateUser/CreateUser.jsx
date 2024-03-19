import "./CreateUser.scss";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { useState, useEffect, useCallback } from "react";
import { apiAddNewUser, apiAllRole} from "../../../apis";
import { validateForm } from "../../../helpers/validate_form";
import Swal from "sweetalert2"

const CreateUser = () =>{
    const [roles, setRoles] = useState(null);
    const fetchRoles = async()=>{
        const response = await apiAllRole();
        if(!response.err){
            setRoles(response.roleData);
        }
    }

    useEffect(()=>{
        fetchRoles()
    },[])
    const [payload, setPayload] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role_id: ""
    });
    const [invalidFields, setInvalidFields] = useState([]); 

    const handleAddNewUser = useCallback(async () => {
        const checkInvalids = validateForm(payload, setInvalidFields);
        if (checkInvalids === 0){
            console.log(payload)
            const response = await apiAddNewUser(payload);
            if(response.err===0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Create product successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else{
                Swal.fire(response.mess);
            }
        }
    }, [payload]);
    return (
        <>
            <h1 className="manager-header">Add new user</h1>
            <div className="manager-body">
            <div className="input-form-add">
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
                            label={"Phone*"}
                            placeHolder={"Phone"}
                            name={"phone"}
                            value={payload.phone}
                            setValue={setPayload}
                            nameKey="phone"
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

                        <SelectInput 
                            label={"Role"}
                            options={roles?roles:null}
                            optionName = {"role_name"}
                            optionValue={"role_id"}
                            value={payload.role_id}
                            setValue={setPayload}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />

                        <ButtonBlack
                            label={"Add New User"}
                            handleOnClick={handleAddNewUser}
                        />
                    </div>
                        
            </div>
        </>

    )
};

export default CreateUser;
