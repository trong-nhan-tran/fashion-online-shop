import { memo } from "react";
import "./ButtonBlack.scss"

const ButtonBlack = ({ type, label, handleOnClick }) => {
    return (
        <div className="action-submit">
            <button 
                className="button-submit" 
                type={ type || "click" }
                onClick={()=> { handleOnClick && handleOnClick()}}
            >{label}</button>
        </div>
    )
};

export default memo(ButtonBlack);