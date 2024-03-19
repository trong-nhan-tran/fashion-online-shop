import "./ProductDetail.scss"
import { useState, useEffect, useCallback } from "react";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { useSelector } from "react-redux";
import { validateForm } from "../../../helpers/validate_form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    apiGetProduct,
    apiGetVariantOfProductByID,
    apiGetAllColorNameOfProductByID,
    apiGetImageAndGroupByColor,
    apiGetAllSizeNameOfProductByID,
    apiGetImageProductByID,
    apiAddProductToCart,
} from "../../../apis";
import { Link, useParams } from "react-router-dom";
import { publicRoute } from "../../../routes";
const ProductDeTail = () => {
    const { isLoggedIn, current } = useSelector(state => state.user);
    const { id } = useParams();
    const [colorsOfProduct, setColorsOfProduct] = useState(null);
    const [images, setImages] = useState(null);
    const [selectedColor, setSelectedColor] = useState({
        color_id: "",
        color_name: ""
    });
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [sizesOfProduct, setSizesOfProduct] = useState(null);
    const [available, setAvailable] = useState(null);
    const [variants, setVariants] = useState(null);
    const [product, setProduct] = useState(null);
    const [invalidFieldsAddToCart, setInvalidFieldsAddToCart] = useState([]);

    const [payloadAddToCart, setPayloadAddToCart] = useState({
        email: current?.email,
        product_id: id,
        color_id: "",
        size_id: "",
        quantity: 1
    })

    const fetchProduct = async (params) => {
        const response = await apiGetProduct(params);
        if (!response.err) {
            setProduct(response.productData)
        }
    }
    const fetchVariants = async (params) => {
        const response = await apiGetVariantOfProductByID(params);
        console.log(response)
        if (!response.err) {
            setVariants(response.variantData);

        }

    }
    const fetchColorsOfProduct = async (id) => {
        const response = await apiGetAllColorNameOfProductByID(id);
        if (!response.err) {
            setColorsOfProduct(response.colorData);

        }
    }
    const fetchImagesGroupByColor = async (params) => {
        const response = await apiGetImageAndGroupByColor(params);
        console.log(response)
        if (!response.err) {
            setImages(response.imageColor);
        }
    }

    useEffect(() => {
        fetchProduct(id);
        fetchColorsOfProduct(id);
        fetchVariants(id)

    }, [id]);

    useEffect(() => {
        fetchImagesGroupByColor(id);

    }, [id]);

    useEffect(() => {
        if (variants) {
            setSelectedColor(variants[0].colorData);
            const color_id = selectedColor.color_id;
            const sizes = variants?.filter(variant => variant.color_id == color_id).map(variant => variant.sizeData);
            setSizesOfProduct(sizes);
            setPayloadAddToCart(prevState => ({
                ...prevState,
                color_id: color_id,
                size_id: ""
            }));
        }
    }, [variants]);




    const handleColorChange = (event) => {
        const color = colorsOfProduct.find(color => color.color_id == event.target.value);
        console.log(color)
        setSelectedColor(color)
        setPayloadAddToCart(prevState => ({
            ...prevState,
            color_id: color.color_id
        }));

        console.log(variants)
        // Update sizesOfProduct based on the selected color
        const sizes = variants.filter(variant => variant.color_id == color.color_id).map(variant => variant.sizeData);
        console.log(sizes)
        setSizesOfProduct(sizes);
        setAvailable(variants.quantity)

        // Reset size_id and quantity in payloadAddToCart
        setPayloadAddToCart(prevState => ({
            ...prevState,
            size_id: ""
        }));
    };



    const handleQuantityReduce = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    }
    
    const handleQuantityAugure = () => {
        if (selectedQuantity < 99) {
            setSelectedQuantity(selectedQuantity + 1);
        }
    }
    
    useEffect(() => {
        setPayloadAddToCart(prevState => ({
            ...prevState,
            quantity: selectedQuantity
        }));
    }, [selectedQuantity]);
    

    const handleAddToCart = useCallback(async () => {
        const checkInvalids = validateForm(payloadAddToCart, setInvalidFieldsAddToCart);
        console.log(checkInvalids)
        if (checkInvalids === 0) {
            const response = await apiAddProductToCart(payloadAddToCart);
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
    }, [payloadAddToCart]);
    return (
        <>
            <div className="product-detail-container">
                <div className="image-container">
                    {images && images[selectedColor.color_id]?.map((image, index) => (
                        <img key={index} className="image-item" src={image.image_path} />
                    ))}
                </div>


                <div className="right-container">
                    <div className="buying-container">
                        <div className="buying-header">
                            <h4 className="buying-title">
                                {product?.product_name}
                            </h4>
                            <div className="product-review">
                                <div className="product-rating">
                                    <i className="bi-star-fill"></i>
                                    <i className="bi-star-fill"></i>
                                    <i className="bi-star-fill"></i>
                                    <i className="bi-star-fill"></i>
                                    <i className="bi-star-fill"></i>
                                </div>
                                <p className="amount-review" href="">(3)</p>
                                <a className="questions-answers" href="">Questions & Answers</a>
                            </div>

                            <div className="product-price">
                                <span>${product?.price}</span>
                            </div>

                        </div>

                        <div className="select-color">
                            <div className="select-color-header">
                                <span className="color-title">Color</span>
                                <span className="color-value">{selectedColor.color_name}</span>

                            </div>
                            <div className="color-body">
                                {images && Object.entries(images).map(([color_id, images]) => (
                                    <label className="color-item" key={color_id}>
                                        <input
                                            type="radio"
                                            name="color"
                                            value={color_id}
                                            onChange={handleColorChange}
                                            checked={selectedColor.color_id == color_id}
                                        />
                                        <span className="swatch-color">
                                            <img className="image-item" src={images[0].image_path}/>
                                        </span>
                                    </label>
                                ))}
                            </div>

                        </div>

                        <div className="select-size-container">
                            <div className="select-size-header">
                                <div className="size-title">Select Size</div>
                                <div className="size-guide">Size Guide</div>
                            </div>

                            <SelectInput
                                label={"Size"}
                                options={sizesOfProduct ? sizesOfProduct : null}
                                optionName={"size_name"}
                                optionValue={"size_id"}
                                value={payloadAddToCart.size_id}
                                setValue={setPayloadAddToCart}
                                invalidFields={invalidFieldsAddToCart}
                                setInvalidFields={setInvalidFieldsAddToCart}
                            />
                        </div>

                        <div className="select-quantity">
                            <div className="quantity-title">
                                <p>Select Quantity</p>
                                {/* <p>Available {available}</p> */}
                            </div>

                            <div className="box-quantity">
                                <div className="button-quantity quantity-reduce" onClick={handleQuantityReduce}>
                                    <i className="bi-dash-lg"></i>
                                </div>
                                <input className="quantity-input" type="number" value={selectedQuantity} min={1} max={99} readOnly />
                                <div className="button-quantity quantity-augure" onClick={handleQuantityAugure}>
                                    <i className="bi-plus-lg"></i>
                                </div>
                            </div>
                        </div>

                        <div className="button-add-to-bag">
                            {
                                isLoggedIn?
                                <ButtonBlack 
                                    label={"Add to Bag"}
                                    handleOnClick={handleAddToCart}
                                />
                                :<Link to={`${publicRoute.HOME}/${publicRoute.LOGIN}`}>
                                    <ButtonBlack label={"Add to Bag"}/>
                                </Link>
                                
                            }
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </>
    )
};
export default ProductDeTail;
