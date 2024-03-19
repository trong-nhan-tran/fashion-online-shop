import { memo } from "react";
import "./SelectInput.scss"

const SelectInput = ({ 
        options , 
        optionName, 
        optionValue, 
        name, 
        value,
        setValue, 
        required, 
        label, 
        invalidFields, 
        setInvalidFields, 
        onBlur }) => {

    let checkError = false;
    let errorFields;
    if(invalidFields?.some(el=>el.name===optionValue)){
        checkError=true;
        errorFields = invalidFields?.find(el=>el.name===optionValue);
    };
    return (
        <div className="select-container">
            <label className="label-title">{label}</label>
            <select className="input-select" 
                name={name} 
                value={value}
                onChange={e => setValue(prev => ({...prev, [optionValue]: e.target.value}))}
                onFocus={() => {
                    setInvalidFields(prev => prev.filter(el => el.name !== optionValue))
                }}
            >
                <option value="">Select {label}</option>
                {options?.map((option)=>{
                    return(
                        <option key={option[optionValue]} value={option[optionValue]}>{option[optionName]}</option>
                    )
                })}
            </select>
            { checkError && 
                <span className="error-input-message">
                    {errorFields.mess}
                </span>
            }
        </div>
    )
};

export default memo(SelectInput);