import "./UserDetail.scss";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { useState, useEffect, useCallback } from "react";
import { apiGetOneUser, apiAllRole, apiUpdateUser} from "../../../apis";
import { validateForm } from "../../../helpers/validate_form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const UserDetail = () =>{
    const {id} = useParams() 
    const [roles, setRoles] = useState(null);
    const [payload, setPayload] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role_id: ""
    });
    const fetchRoles = async()=>{
        const response = await apiAllRole();
        if(!response.err){
            setRoles(response.roleData);
        }
    }
    const fetchUser = async(id)=>{ 
        const response = await apiGetOneUser(id);
        if(!response.err){
            setPayload({
                first_name: response.userData.first_name,
                last_name: response.userData.last_name,
                email: response.userData.email,
                phone: response.userData.phone,
                role_id: response.userData.role_id
            });
        }
    }

    useEffect(()=>{
        fetchRoles();
        fetchUser(id)
    },[id])
    const [invalidFields, setInvalidFields] = useState([]); 

    const handleUpdateUser = useCallback(async () => {
        const checkInvalids = validateForm(payload, setInvalidFields);
        if (checkInvalids === 0){
            console.log(payload)
            const response = await apiUpdateUser(payload);
            if(response.err===0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Update user successfully",
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
            <h1 className="manager-header">Update user</h1>
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
                            label={"Update User"}
                            handleOnClick={handleUpdateUser}
                        />
                    </div>
                        
            </div>
        </>

    )
};

export default UserDetail;
