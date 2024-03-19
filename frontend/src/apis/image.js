import axios from "../configs/axiosConfig";

export const apiGetImageProductByID = (params) => axios({
    url: "/image/"+ params,
    method: "get"
})
export const apiGetImageAndGroupByColor = (params) => axios({
    url: "/image/group-by/"+ params,
    method: "get"
})

export const apiAddImageColor = (data) => axios({
    url: "/image/add",
    method: "post",
    data
})

export const apiDeleteProductImage = (data) => axios({
    url: "/image/delete",
    method: "delete",
    data
})