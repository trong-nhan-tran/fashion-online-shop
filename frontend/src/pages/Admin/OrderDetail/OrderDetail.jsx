import "./OrderDetail.scss";
import InputField from "../../../components/Input/InputField";
import ButtonBlack from "../../../components/Button/ButtonBlack";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { useState, useEffect, useCallback } from "react";
import { apiGetStatuses, apiGetOrderDetail, apiGetOneOrder, apiUpdateStatusOrder} from "../../../apis";
import { validateForm } from "../../../helpers/validate_form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const OrderDetail = () => {
    const { id } = useParams();
    const [statuses, setStatuses] = useState(null);
    const [order, setOrder] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);

    const [payloadUpdateStatusOrder, setPayloadUpdateStatusOrder] = useState({
        order_id: "",
        status_id: ""
    });
    const fetchStatus = async () => {
        const response = await apiGetStatuses();
        if (!response.err) {
            setStatuses(response.statusData);
        }
    }

    const fetchOrder = async (id) => {
        const response = await apiGetOneOrder(id);
        if (!response.err) {
            setOrder(response.orderData)
            setPayloadUpdateStatusOrder(
                {
                    order_id: response.orderData.order_id,
                    status_id: response.orderData.status_id,
                }
            )
        }
    }
    const fetchProductFromOrder = async (id) => {
        const response = await apiGetOrderDetail(id);
        if (!response.err) {
            setOrderDetail(response.orderDetailData)
        }
    }
    useEffect(() => {
        fetchOrder(id)
        fetchProductFromOrder(id)
        fetchStatus()
    }, [id])


    const [invalidFields, setInvalidFields] = useState([]);

    const handleUpdateStatus = useCallback(async () => {
        const checkInvalids = validateForm(payloadUpdateStatusOrder, setInvalidFields);
        if (checkInvalids === 0) {
            const response = await apiUpdateStatusOrder(payloadUpdateStatusOrder);
            if (response.err === 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updated status successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire(response.mess);
            }
        }
    }, [payloadUpdateStatusOrder]);
    return (
        <>
            <h1 className="manager-header">Order Detail - ID: {order?.order_id}</h1>
            <div className="manager-body">
                <div className="order-description">
                    <div className="order-detail-item">
                        <div className="order-detail-item-title">Customer</div>
                        <div className="order-detail-item-content">{order?.customer_name}</div>
                    </div>
                    <div className="order-detail-item">
                        <div className="order-detail-item-title">Phone</div>
                        <div className="order-detail-item-content">{order?.order_phone}</div>
                    </div>
                    <div className="order-detail-item">
                        <div className="order-detail-item-title">Address</div>
                        <div className="order-detail-item-content">{order?.address}</div>
                    </div>
                    <div className="order-detail-item">
                        <div className="order-detail-item-title">Date of order</div>
                        <div className="order-detail-item-content">{moment(order?.createdAt).format('HH:mm, DD/MM/YYYY')}</div>
                    </div>

                    <div className="order-detail-item">
                        <div className="order-detail-item-title">Total cost</div>
                        <div className="order-detail-item-content">$</div>
                    </div>
                    <div className="status-action">
                        <SelectInput
                            label={"Status"}
                            options={statuses ? statuses : null}
                            optionName={"status_name"}
                            optionValue={"status_id"}
                            value={payloadUpdateStatusOrder.status_id}
                            setValue={setPayloadUpdateStatusOrder}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />

                        <ButtonBlack
                            label={"Update status"}
                            handleOnClick={handleUpdateStatus}
                        />

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
                            {orderDetail && orderDetail?.map((product, idx) => {
                                return (
                                    <tr className="table-row-product" key={`${product.product_id}-${product.color_id}-${product.size_id}`}>
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
                                        <td className="column-7">${product.quantity * product.productData.price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>


        </>
    );
};

export default OrderDetail;
