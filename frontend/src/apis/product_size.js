import axios from "../configs/axiosConfig";

export const apiGetAllSizeNameOfProductByID = (params) => axios({
    url: "/product-size/" + params,
    method: "get",
})