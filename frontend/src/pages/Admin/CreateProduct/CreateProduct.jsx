import "./CreateProduct.scss";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { useState, useEffect, useCallback } from "react";
import { apiAddProduct, apiGetCategories, apiGetTypes } from "../../../apis";
import { validateForm } from "../../../helpers/validate_form";
import Swal from "sweetalert2"

const CreateProduct = () =>{
    const [categories, setCategories] = useState(null);
    const [types, setTypes] = useState(null);
    const fetchCategories = async()=>{
        const response = await apiGetCategories();
        if(!response.err){
            setCategories(response.categories);
        }
    }
    const fetchTypes = async()=>{
        const response = await apiGetTypes();
        if(!response.err){
            setTypes(response.types);
        }
    }
    useEffect(()=>{
        fetchCategories()
        fetchTypes()
    },[])

    const [payload, setPayload] = useState({
        product_name: "",
        price: "",
        description: "",
        price : "",
        category_id: "",
        type_id: "",
        thumbnail: ""
    });
    const [invalidFields, setInvalidFields] = useState([]);

    const handleSubmit = useCallback(async () => {
        const checkInvalids = validateForm(payload, setInvalidFields);
        if (checkInvalids === 0){
            console.log(payload)
            const response = await apiAddProduct(payload);
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
    return(
        <>
            <h1 className="manager-header">Create Product</h1>
            <div className="manager-body crate-product-body">
                <div className="input-form-add">
                        <InputField 
                            label={"Product name"}
                            placeHolder={"Product name"}
                            value={payload.product_name}
                            setValue={setPayload}
                            nameKey="product_name"
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
  

                        <InputField 
                            label={"Price"}
                            placeHolder={"Price"}
                            value={payload.price}
                            setValue={setPayload}
                            nameKey="price"
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            type={"number"}
                        />

                    <InputField 
                        label={"Description"}
                        placeHolder={"Description"}
                        value={payload.description}
                        setValue={setPayload}
                        nameKey="description"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />

                    <div className="row-two-input">
                        <SelectInput 
                            label={"Category"}
                            options={categories?categories:null}
                            optionName = {"category_name"}
                            optionValue={"category_id"}
                            value={payload.category_id}
                            setValue={setPayload}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <SelectInput 
                            label={"Type"}
                            options={types?types:null}
                            optionName = {"type_name"}
                            optionValue={"type_id"}
                            value={payload.type_id}
                            setValue={setPayload}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        
                    </div>

                    <InputField 
                        label={"Thumbnail"}
                        placeHolder={"Thumbnail"}
                        value={payload.thumbnail}
                        setValue={setPayload}
                        nameKey="thumbnail"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />

                    <ButtonBlack
                        label={"Add Product"}
                        handleOnClick={handleSubmit}
                    />
                </div>

                <div className="thumbnail-container">
                    <img src={payload.thumbnail} alt="" />
                </div>
            </div>
        </>
    );
};

export default CreateProduct;
