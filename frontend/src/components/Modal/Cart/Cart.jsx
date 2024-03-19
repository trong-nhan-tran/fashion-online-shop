import "../Modal.scss"
import './Cart.scss';
import { memberRoute } from '../../../routes';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { apiGetProductsFromCart, apiDeleteProductFromCart} from "../../../apis";
import { useSelector } from "react-redux";
const ModalCart = ({ toggleCart, isOpen }) => {

    const [countProducts, setCountProducts] = useState(null);
    const [products, setProducts] = useState(null);
    const { isLoggedIn, current } = useSelector(state => state.user);
    const fetchProductFromCart = async (data) => {
        const response = await apiGetProductsFromCart(data);
        if (!response.err) {
            setProducts(response.products);
            setCountProducts(response.count)
        }
    }

    useEffect(() => {
        fetchProductFromCart(current?.email)
    }, [current?.email, isLoggedIn]);
    return (
        <>
            <div className={`modal modal-cart ${isOpen ? 'open' : ''}`}>
                <div className="overlay"
                    onClick={toggleCart}></div>

                <div className={`modal-content cart-content ${isOpen ? 'open' : ''}`}>
                    <div className="modal-header cart-header">
                        <h2>Shopping Bag</h2>

                        <div className="exit-button" onClick={toggleCart}>
                            <i className="bi-x"></i>
                        </div>
                    </div>

                    <div className="modal-body modal-cart-body">
                        {products && products.length>0? products?.map((product)=>{
                            return(
                                <div className="cart-item" key={`${product.product_id}-${product.color_id}-${product.size_id}`}>
                                    <div className="cart-item-image">
                                        <img src={product.colorData.imageData[0].image_path} alt="IMG" />
                                    </div>

                                    <div className="cart-item-info">
                                        <div className="cart-item-name">
                                            <a href="#" >
                                               {product.productData.product_name}
                                            </a>
                                        </div>

                                        <div className="cart-item-color-and-size">
                                            <span className="cart-item-color">{product.colorData.color_name} | </span>
                                            <span className="cart-item-size">{product.sizeData.size_name}</span>
                                        </div>
                                        <div className="cart-item-quantity">Quantity {product.quantity}</div>
                                        <div className="cart-item-price">${product.productData.price*product.quantity}</div>

                                        <div className="cart-item-remove-button">Remove</div>
                                    </div>
                                </div>

                            )
                        })
                        :<h2>Shopping bag is empty</h2>
                        }
                    </div>

                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="quantity">
                                Subtotal {countProducts} Items
                            </div>
                            <div className="cart-total ">
                                ${products?.reduce((total, product) => total + product.productData.price * product.quantity, 0)}
                            </div>
                        </div>

                        <div className="checkout-submit">
                            <Link onClick={() => closeModalCart(false)} to={"/member/" + memberRoute.CART} className="checkout-button">
                                Checkout
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
export default ModalCart;
