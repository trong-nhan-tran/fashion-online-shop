import { memo } from "react";
import "./InputField.scss"

const InputField = ({readOnly ,type, value, setValue, defaultValue, placeHolder ,required, label, name, nameKey, invalidFields, setInvalidFields, onBlur}) => {
    let checkError = false; 
    let errorFields;
    if(invalidFields?.some(el=>el.name===nameKey)){
        checkError=true;
        errorFields = invalidFields?.find(el=>el.name===nameKey);
    };
    return (
        <div className="input-field">
            <label className="label-title">{label}</label>
            <input 
                className="input-box" 
                name = {name}  
                type={type || 'text'} 
                required = {required || true}
                value = {value}
                placeholder={placeHolder}
                onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
                onFocus={() => {
                    setInvalidFields(prev => prev.filter(el => el.name !== nameKey))
                }}
                defaultValue={defaultValue}
                readOnly={readOnly? true: false}
            >
            </input>
            { checkError && 
                <span className="error-input-message">
                    {errorFields.mess}
                </span>
            }
            
        </div>
    )
};

export default memo(InputField);