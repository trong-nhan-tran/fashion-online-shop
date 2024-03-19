import axios from "../configs/axiosConfig";

export const apiGetProductsFromCart = (data) => axios({
    url: `/order/get-cart?email=${encodeURIComponent(data)}`,
    method: "get"
});
export const apiGetOrderHistory = (data) => axios({
    url: `/order/get-order-history?email=${encodeURIComponent(data)}`,
    method: "get"
});


export const apiPlaceOrder = (data) => axios({
    url: "/order/place-order",
    method: "put",
    data
});

export const apiGetAllOrder = (params) => axios({
    url: "/order",
    method: "get",
    params
});
export const apiGetOneOrder = (id) => axios({
    url: "/order/" + id,
    method: "get"
});
export const apiUpdateStatusOrder = (data) => axios({
    url: "/order/update-status",
    method: "put",
    data
});
export const apiDeleteOrder = (id) => axios({
    url: "/order/delete/"+ id,
    method: "delete",
});


