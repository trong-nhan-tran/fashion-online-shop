import { apiGetOrderHistory, apiDeleteOrder } from "../../../apis";
import "./Orders.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Orders = () => {
    const [orders, setOrders] = useState(null);
    const { isLoggedIn, current } = useSelector(state => state.user);

    const fetchOrderHistory = async (data) => {
        const response = await apiGetOrderHistory(data);
        if (!response.err) {
            setOrders(response.orders);
        }
    }

    useEffect(() => {
        fetchOrderHistory(current.email)
    }, [current.email, isLoggedIn]);


    const handleDeleteOrder = (id) => {
        Swal.fire({
            title: "Remove this order?",
            icon: "warning",
            showCancelButton: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                const response = await apiDeleteOrder(id);
                if (!response.err) {
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
                else {
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
                fetchOrderHistory(current.email)
            }
        })
    }
    return (
        <>
            <div className="top-header header-my-order">
                <h2>My Orders</h2>
            </div>
            <div className="orders-list">
                {orders && orders?.map((order) => {
                    return (
                        <div className="order-item" key={order.order_id}>
                            <div className="order-item-header">
                                <h3 className="order-number">Order ID: {order.order_id}</h3>
                                <div className="button-black button-cancel-order" onClick={() => handleDeleteOrder(order.order_id)}>Cancel Order</div>
                            </div>
                            <div className="order-detail">
                                <div className="order-detail-item">
                                    <div className="order-detail-item-title">Customer</div>
                                    <div className="order-detail-item-content">{order.customer_name}</div>
                                </div>
                                <div className="order-detail-item">
                                    <div className="order-detail-item-title">Phone</div>
                                    <div className="order-detail-item-content">{order.order_phone}</div>
                                </div>
                                <div className="order-detail-item">
                                    <div className="order-detail-item-title">Address</div>
                                    <div className="order-detail-item-content">{order.address}</div>
                                </div>
                                <div className="order-detail-item">
                                    <div className="order-detail-item-title">Date of order</div>
                                    <div className="order-detail-item-content">{moment(order.createdAt).format('HH:mm, DD/MM/YYYY')}</div>
                                </div>

                                <div className="order-detail-item">
                                    <div className="order-detail-item-title">Total cost</div>
                                    <div className="order-detail-item-content">${order.orderDetailData?.reduce((total, product) => total + product.productData.price * product.quantity, 0)}</div>
                                </div>
                                <div className="order-detail-item">
                                    <div className="order-detail-item-title">Status</div>
                                    <div className="order-detail-item-content">{order.statusData.status_name}</div>
                                </div>
                            </div>

                            <div className="product-of-item-table">
                                <table>
                                    <thead>
                                        <tr className="table-row-header">
                                            <td className="table-column-header">No.</td>
                                            <td className="table-column-header">Product</td>
                                            <td className="table-column-header">Color</td>
                                            <td className="table-column-header">Size</td>
                                            <td className="table-column-header">Price</td>
                                            <td className="table-column-header">Quantity</td>
                                            <td className="table-column-header">Subtotal</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.orderDetailData && order.orderDetailData?.map((product, idx)=>{
                                            return(
                                                <tr className="table-row-product">
                                                    <td className="column-1">{idx + 1}</td>
                                                    <td className="column-2">
                                                        <div className="product-name">
                                                            <img src={product.colorData.imageData[0].image_path} className="product-image" />
                                                            <span>{product.productData.product_name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="column-3">{product.colorData.color_name}</td>
                                                    <td className="column-4">{product.sizeData.size_name}</td>
                                                    <td className="column-5">${product.productData.price}</td>
                                                    <td className="column-6">{product.quantity}</td>
                                                    <td className="column-7">${product.quantity*product.productData.price}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}

                <ToastContainer></ToastContainer>
            </div>
        </>
    )
};
export default Orders;