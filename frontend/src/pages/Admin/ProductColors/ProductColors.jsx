import "./ProductColors.scss";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useCallback } from "react";
import { 
    apiGetImageProductByID, 
    apiAddImageColor, 
    apiGetAllColorNameOfProductByID, 
    apiDeleteProductImage,
    apiAddColor 
} from "../../../apis";
import { validateForm } from "../../../helpers/validate_form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import moment from "moment";
import { render } from "react-dom";


const ProductColors = () => {
    const [images, setImages] = useState(null);
    const [colorsOfProduct, setColorsOfProduct] = useState(null);
    const { id } = useParams();

    const [payloadAddImage, setPayloadAddImage] = useState({
        product_id: id,
        color_id: "",
        image_path: ""
    })

    const [payloadAddColor, setPayloadAddColor] = useState({
        product_id: id,
        color_name: ""
    })

    const [invalidFieldsAddImage, setInvalidFieldsAddImage] = useState([]);
    const [invalidFieldsAddColor, setInvalidFieldsAddColor] = useState([]);
    
    const handleAddNewImage = useCallback(async () => {
        const checkInvalids = validateForm(payloadAddImage, setInvalidFieldsAddImage);
        if (checkInvalids === 0) {
            const response = await apiAddImageColor(payloadAddImage);
            if (response.err === 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Add new image color successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchImages(id)
            }
            else {
                Swal.fire(response.mess);
            }
        }
    }, [payloadAddImage]);

    const handleAddNewColor = useCallback(async () => {
        const checkInvalids = validateForm(payloadAddColor, setInvalidFieldsAddColor);
        console.log(checkInvalids)
        if (checkInvalids === 0) {
            const response = await apiAddColor(payloadAddColor);
            if (response.err === 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Add new color successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchColorsOfProduct(id);
            }
            else {
                Swal.fire(response.mess);
            }
        }
    }, [payloadAddColor]);

    const handleDeleteProductImage = (data)=>{
        Swal.fire({
            title: "Remove this image?",
            icon: "warning",
            showCancelButton: true
        }).then(async(res)=>{
            if(res.isConfirmed){
                const response = await apiDeleteProductImage(data);
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
    const fetchImages = async (params) => {
        const response = await apiGetImageProductByID(params);
        if (response.err == 0) {
            setImages(response.imageColor);
        }
    }
    const fetchColorsOfProduct = async (data) => {
        const response = await apiGetAllColorNameOfProductByID(data);
        if (response.err == 0) {
            setColorsOfProduct(response.colorData);
        }
    }

    useEffect(() => {
        fetchImages(id)
        fetchColorsOfProduct(id)
    }, [id])

    return (
        <>
            <h1 className="manager-header">Color And Image Of Product</h1>
            <div className="manager-body">
                <div className="row-two-input">
                    <InputField
                        label={"Color name"}
                        placeHolder={"Color name"}
                        value={payloadAddColor.color_name}
                        setValue={setPayloadAddColor}
                        nameKey="color_name"
                        invalidFields={invalidFieldsAddColor}
                        setInvalidFields={setInvalidFieldsAddColor}
                    />
                    <ButtonBlack
                        label={"Add new Color"}
                        handleOnClick={handleAddNewColor}
                    />
                </div>

                <div className="row-two-input">
                    <SelectInput
                        label={"Color"}
                        options={colorsOfProduct ? colorsOfProduct : null}
                        optionName={"color_name"}
                        optionValue={"color_id"}
                        value={payloadAddImage.color_id}
                        setValue={setPayloadAddImage}
                        invalidFields={invalidFieldsAddImage}
                        setInvalidFields={setInvalidFieldsAddImage}
                    />
                    <InputField
                        label={"Image path"}
                        placeHolder={"Image path"}
                        value={payloadAddImage.image_path}
                        setValue={setPayloadAddImage}
                        nameKey="image_path"
                        invalidFields={invalidFieldsAddImage}
                        setInvalidFields={setInvalidFieldsAddImage}
                    />
                    <ButtonBlack
                        label={"Add new Image"}
                        handleOnClick={handleAddNewImage}
                    />
                </div>
                <table className="main-table">
                    <thead>
                        <tr className="table-row-header">
                            <td className="table-column-header">No</td>
                            <td className="table-column-header">Product ID</td>
                            <td className="table-column-header">Product name</td>
                            <td className="table-column-header">Color</td>
                            <td className="table-column-header">Image</td>
                            <td className="table-column-header">Create at</td>
                            <td className="table-column-header">Update at</td>
                            <td className="table-column-header">Action</td>

                        </tr>
                    </thead>

                    <tbody>
                        {images?.map((el, idx) => {
                            return (
                                <tr className="table-row" key={el.image_path}>
                                    <td className="column-1">{idx + 1}</td>
                                    <td className="column-1">{el.product_id}</td>
                                    <td className="column-4">{el.productData.product_name}</td>
                                    <td className="column-5">{el.colorData.color_name}</td>
                                    <td >
                                        <img src={el.image_path} alt="" className="product-color-image" />
                                    </td>

                                    <td>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(el.updatedAt).format('DD/MM/YYYY')}</td>
                                    <td className="action-button-container">
                                        <span title="Edit"><i className="bi bi-pencil-square"></i></span>
                                        <span 
                                            title="Delete"
                                            onClick={()=>handleDeleteProductImage({
                                                product_id: el.product_id,
                                                color_id: el.color_id,
                                                image_path: el.image_path
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

export default ProductColors;
