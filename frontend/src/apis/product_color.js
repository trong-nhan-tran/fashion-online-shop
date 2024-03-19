import axios from "../configs/axiosConfig";

export const apiGetAllColorNameOfProductByID = (params) => axios({
    url: "/product-color/" + params,
    method: "get",
})