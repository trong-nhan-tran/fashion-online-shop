export const validateForm = (payload, setInvalidFields) =>{
    let invalids = 0;
    const formatPayload = Object.entries(payload);
    console.log(formatPayload)
    for(let arr of formatPayload){
        if (typeof arr[1] ==="string"){
            if(arr[1].trim() === ""){
                invalids++;
                setInvalidFields(prev => [...prev, {name: arr[0], mess: "This field cannot be blank."}]);
            }

        }
    };

    for(let arr of formatPayload){
        switch (arr[0]){
            case "email": 
                if(!arr[1].match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                    invalids++;
                    setInvalidFields(prev => [...prev, {name: arr[0], mess: "Please enter a valid email address."}]);
                }
                break;
    
            case "password":
                if(arr[1].length < 6){
                    invalids++;
                    setInvalidFields(prev => [...prev, {name: arr[0], mess: "The password must have at least 6 characters."}]);
                }
                break;
    
            case "current_password":
                if(arr[1].length < 6){
                    invalids++;
                    setInvalidFields(prev => [...prev, {name: arr[0], mess: "The password must have at least 6 characters."}]);
                }
                break;
    
            case "new_password":
                if(arr[1].length < 6){
                    invalids++;
                    setInvalidFields(prev => [...prev, {name: arr[0], mess: "The password must have at least 6 characters."}]);
                }
                break;
    
            case "order_phone":
                if(!arr[1].match(/^\d{10}$/)){
                    invalids++;
                    setInvalidFields(prev => [...prev, {name: arr[0], mess: "Please enter a valid phone number."}]);
                }
                break;
            case "phone":
                if(!arr[1].match(/^\d{10}$/)){
                    invalids++;
                    setInvalidFields(prev => [...prev, {name: arr[0], mess: "Please enter a valid phone number."}]);
                }
                break;
    
            default:
                break;
        }
    }
    

    return invalids;
}