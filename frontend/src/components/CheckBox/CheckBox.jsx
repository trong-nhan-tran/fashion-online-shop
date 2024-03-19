
import "./CheckBox.scss";
import { memo } from "react";

const CheckBox = ({type, id, value, setValue, checked, label, name, onChange}) => {
    return (
        <div className="check-box-group">
            <input 
                className="check-box-input"
                type="checkbox"
                id={id} 
                name={name}  
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <label className="check-box-label">{label}</label>
        </div>
    )
};

export default memo(CheckBox);