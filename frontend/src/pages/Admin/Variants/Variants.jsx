import "./Variants.scss";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useCallback } from "react";
import { 
    apiGetAllColorNameOfProductByID, 
    apiAddSize, 
    apiGetVariantOfProductByID,
    apiAddVariantForProduct,
    apiDeleteVariantOfProduct,
    apiGetAllSizeNameOfProductByID
} from "../../../apis";
import { validateForm } from "../../../helpers/validate_form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import moment from "moment";


const Variants = () => {
    const [variants, setVariants] = useState(null);
    const [colorsOfProduct, setColorsOfProduct] = useState(null);
    const [sizesOfProduct, setSizesOfProduct] = useState(null);
    const { id } = useParams();

    const [payloadAddVariant, setPayloadAddVariant] = useState({
        product_id: id,
        color_id: "",
        size_id: "",
    });

    const [payloadAddSize, setPayloadAddSize] = useState({
        product_id: id,
        size_name: ""
    });

    const [invalidFieldsAddVariant, setInvalidFieldsAddVariant] = useState([]);
    const [invalidFieldsAddSize, setInvalidFieldsAddSize] = useState([]);
    
    const handleAddVariant = useCallback(async () => {
        const checkInvalids = validateForm(payloadAddVariant, setInvalidFieldsAddVariant);
        if (checkInvalids === 0) {
            const response = await apiAddVariantForProduct(payloadAddVariant);
            if (!response.err) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Add new variant successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchVariants(id)
            }
            else {
                Swal.fire(response.mess);
            }
        }
    }, [payloadAddVariant]);

    const handleAddNewSize = useCallback(async () => {
        const checkInvalids = validateForm(payloadAddSize, setInvalidFieldsAddSize);
        console.log(checkInvalids)
        if (checkInvalids === 0) {
            const response = await apiAddSize(payloadAddSize);
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
                fetchSizesOfProduct(id)    
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
    }, [payloadAddSize]);

    const handleDeleteVariant = (data)=>{
        Swal.fire({
            title: "Remove this variant?",
            icon: "warning",
            showCancelButton: true
        }).then(async(res)=>{
            if(res.isConfirmed){
                const response = await apiDeleteVariantOfProduct(data);
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
                    fetchVariants(id)    
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
        })
    }
    const fetchVariants = async (params) => {
        const response = await apiGetVariantOfProductByID(params);
        if (response.err == 0) {
            setVariants(response.variantData);
        }
    }
    const fetchColorsOfProduct = async (id) => {
        const response = await apiGetAllColorNameOfProductByID(id);
        if (response.err == 0) {
            setColorsOfProduct(response.colorData);
        }
    }

    const fetchSizesOfProduct = async (id) => {
        const response = await apiGetAllSizeNameOfProductByID(id);
        if (response.err == 0) {
            setSizesOfProduct(response.sizeData);
        }
    }

    useEffect(() => {
        fetchVariants(id)
        fetchColorsOfProduct(id)
        fetchSizesOfProduct(id)
    }, [id])

    return (
        <>
            <h1 className="manager-header">Size And Variants Of Product</h1>
            <div className="manager-body">
                <div className="row-two-input">
                    <InputField
                        label={"Size name"}
                        placeHolder={"Size name"}
                        value={payloadAddSize.size_name}
                        setValue={setPayloadAddSize}
                        nameKey="size_name"
                        invalidFields={invalidFieldsAddSize}
                        setInvalidFields={setInvalidFieldsAddSize}
                    />
                    <ButtonBlack
                        label={"Add new Size"}
                        handleOnClick={handleAddNewSize}
                    />
                </div>

                <div className="row-two-input">
                    <SelectInput
                        label={"Color"}
                        options={colorsOfProduct ? colorsOfProduct : null}
                        optionName={"color_name"}
                        optionValue={"color_id"}
                        value={payloadAddVariant.color_id}
                        setValue={setPayloadAddVariant}
                        invalidFields={invalidFieldsAddVariant}
                        setInvalidFields={setInvalidFieldsAddVariant}
                    />

                    <SelectInput
                        label={"Size"}
                        options={sizesOfProduct ? sizesOfProduct : null}
                        optionName={"size_name"}
                        optionValue={"size_id"}
                        value={payloadAddVariant.size_id}
                        setValue={setPayloadAddVariant}
                        invalidFields={invalidFieldsAddVariant}
                        setInvalidFields={setInvalidFieldsAddVariant}
                    />
                    <ButtonBlack
                        label={"Add new Variant"}
                        handleOnClick={handleAddVariant}
                    />
                </div>
                <table className="main-table">
                    <thead>
                        <tr className="table-row-header">
                            <td className="table-column-header">No</td>
                            <td className="table-column-header">Product ID</td>
                            <td className="table-column-header">Product name</td>
                            <td className="table-column-header">Color</td>
                            <td className="table-column-header">Size</td>
                            <td className="table-column-header">Create at</td>
                            <td className="table-column-header">Update at</td>
                            <td className="table-column-header">Action</td>

                        </tr>
                    </thead>

                    <tbody>
                        {variants?.map((el, idx) => {
                            return (
                                <tr className="table-row" key={`${el.product_id}-${el.color_id}-${el.size_id}`}>
                                    <td className="column-1">{idx + 1}</td>
                                    <td className="column-1">{el.product_id}</td>
                                    <td className="column-4">{el.productData.product_name}</td>
                                    <td className="column-5">{el.colorData.color_name}</td>
                                    <td className="column-5">{el.sizeData.size_name}</td>

                                    <td>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(el.updatedAt).format('DD/MM/YYYY')}</td>
                                    <td className="action-button-container">
                                        <span title="Edit"><i className="bi bi-pencil-square"></i></span>
                                        <span 
                                            title="Delete"
                                            onClick={()=>handleDeleteVariant({
                                                product_id: el.product_id,
                                                color_id: el.color_id,
                                                size_id: el.size_id
                                            })}
                                        ><i className="bi-trash3"></i></span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Variants;
