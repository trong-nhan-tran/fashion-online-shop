import axios from "../configs/axiosConfig";

export const apiGetProducts = (params) => axios({
    url: "/product",
    method: "get",
    params
})

export const apiGetProduct = (id) => axios({
    url: `/product/${id}`,
    method: "get",
})
export const apiAddProduct = (data) => axios({
    url: `/product/add`,
    method: "post",
    data
})
export const apiDeleteProduct = (id) => axios({
    url: `/product/${id}`,
    method: "delete",
})
export const apiUpdateProduct = (data) => axios({
    url: "/product/update",
    method: "put",
    data
})