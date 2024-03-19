import "./Cart.scss";
import { useEffect, useState, useCallback } from "react";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { apiGetProductsFromCart, apiDeleteProductFromCart, apiPlaceOrder } from "../../../apis";
import { useSelector } from "react-redux";
import { validateForm } from "../../../helpers/validate_form";

const ShoppingBag = () => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const { isLoggedIn, current } = useSelector(state => state.user);
    const [products, setProducts] = useState(null);

    const fetchProductFromCart = async (data) => {
        const response = await apiGetProductsFromCart(data);
        if (!response.err) {
            setProducts(response.products);
        }
    }
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
        fetchProductFromCart(current?.email)
    }, [current?.email, isLoggedIn]);

    const handleDeleteProductFromCart = (data) => {
        Swal.fire({
            title: "Remove this product?",
            icon: "warning",
            showCancelButton: true
        }).then(async(res) => {
            if(res.isConfirmed){
                const response = await apiDeleteProductFromCart(data);
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
    
                    // Fetch the updated list of products in the cart
                    fetchProductFromCart(current.email);
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
    const [payloadOrder, setPayloadOrder] = useState({
        order_id: "",
        customer_name: "",
        address: "",
        order_phone: ""
    });
    useEffect(()=>{
        if(products){
            setPayloadOrder(prevState => ({
                ...prevState,
                order_id: products[0]?.order_id,
            }));
        }
    }, [products])
    const [invalidFieldsPlaceOrder, setInvalidFieldsPlaceOrder] = useState([]);


    const handlePlaceOrder = useCallback(async () => {
        const checkInvalids = validateForm(payloadOrder, setInvalidFieldsPlaceOrder);
        console.log(checkInvalids)
        if (checkInvalids === 0) {
            const response = await apiPlaceOrder(payloadOrder);
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
    }, [payloadOrder]);

    // useEffect(() => {
    //     let newSubtotal = products?.reduce((total, product) => total + product.productData.price * product.quantity, 0);
    //     setSubtotal(newSubtotal);
    // }, [products]);
    return (
        <>
            <div className="shopping-bag-container">
                <div className="left-container">
                    <h1 className="shopping-bag-title">Shopping Bag</h1>
                    <div className="shopping-bag-list">
                        {products && products.length>0 ? products?.map((el, idx)=>{
                            return(
                                <div className="shopping-bag-item" key={`${el.product_id}-${el.color_id}-${el.size_id}`}>
                                    <div className="remove-product-button"
                                        onClick={()=>handleDeleteProductFromCart({
                                            order_id: el.order_id,
                                            product_id: el.product_id,
                                            color_id: el.color_id,
                                            size_id: el.size_id
                                        })}
                                    >
                                        <i className="bi-x"></i>
                                    </div>
                                    <div className="product-item-image">
                                        <img src={el.colorData.imageData[0].image_path} alt="IMG" />
                                    </div>

                                    <div className="product-item-info">
                                        <div className="product-item-name">
                                            <a href="#" >{el.productData.product_name}</a>
                                            <div className="in-stock-status">In Stock</div>
                                        </div>
                                        <div className="shopping-bag-change-action">
                                            <div className="change-color-size">
                                                <select name="choose-color" id="color" className="choose-color">
                                                    <option value="">{el.colorData.color_name}</option>
                                                    
                                                </select>
                                                <select name="choose-size" id="size" className="choose-size">
                                                    <option value="">{el.sizeData.size_name}</option>
                                                    
                                                </select>
                                            </div>
                                            <div className="change-quantity">
                                                <div className="box-quantity">
                                                    <div className="button-quantity quantity-reduce" onClick={handleQuantityReduce}>
                                                        <i className="bi-dash-lg"></i>
                                                    </div>
                                                    <input className="quantity-input" type="number" value={el.quantity} min="1" max="99" readOnly />
                                                    <div className="button-quantity quantity-augure" onClick={handleQuantityAugure}>
                                                        <i className="bi-plus-lg"></i>
                                                    </div>
                                                </div>

                                                <div className="item-total-value">${el.productData.price*el.quantity}</div>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            )
                        })

                        :<h2>Shopping bag is empty</h2>
                    }


                    </div>

                </div>
                {products && products.length > 0 ? 
                    <div className="order-summary">
                        <h2 className="order-header-title">Oder Summary</h2>
                        <div className="order-summary-body">
                            <div className="order-summary-row">
                                <span className="left-title">Subtotal</span>
                                <span className="right-value">${products?.reduce((total, product) => total + product.productData.price * product.quantity, 0)}</span>
                            </div>
                            <div className="order-summary-row">
                                <span className="left-title">Shipping</span>
                                <span className="free-shipping">Free</span>
                            </div>

                            <h3 className="shipping-title">Shipping to</h3>
                            <InputField 
                                label={"Full name*"} 
                                name={"customer_name"}
                                placeHolder={"Full name*"}
                                value={payloadOrder.customer_name}
                                setValue={setPayloadOrder}
                                nameKey="customer_name"
                                invalidFields={invalidFieldsPlaceOrder}
                                setInvalidFields={setInvalidFieldsPlaceOrder}
                            />

                            <InputField 
                                label={"Address*"} 
                                name={"address"}
                                placeHolder={"Address*"}
                                value={payloadOrder.address}
                                setValue={setPayloadOrder}
                                nameKey="address"
                                invalidFields={invalidFieldsPlaceOrder}
                                setInvalidFields={setInvalidFieldsPlaceOrder}
                            />

                            <InputField 
                                label={"Phone*"} 
                                name={"order_phone"}
                                placeHolder={"Phone*"}
                                value={payloadOrder.order_phone}
                                setValue={setPayloadOrder}
                                nameKey="order_phone"
                                invalidFields={invalidFieldsPlaceOrder}
                                setInvalidFields={setInvalidFieldsPlaceOrder}
                            />
                        </div>

                        <ButtonBlack 
                            label={"Order"}
                            handleOnClick={handlePlaceOrder}
                        />
                    </div>
                    :null

                }
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
}

export default ShoppingBag;