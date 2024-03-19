import axios from "../configs/axiosConfig";

export const apiGetVariantOfProductByID = (params) => axios({
    url: "/variant/"+ params,
    method: "get"
})

export const apiAddVariantForProduct = (data) => axios({
    url: "/variant/add",
    method: "post",
    data
})

export const apiDeleteVariantOfProduct = (data) => axios({
    url: "/variant/delete",
    method: "delete",
    data
})