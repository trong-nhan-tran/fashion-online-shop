import axios from "../configs/axiosConfig";

export const apiAddProductToCart = (data) => axios({
    url: "/order-detail/add",
    method: "post",
    data
});

export const apiDeleteProductFromCart = (data) => axios({
    url: "/order-detail/delete",
    method: "delete",
    data
})
export const apiGetOrderDetail = (id) => axios({
    url: "/order-detail/"+ id,
    method: "get"
})