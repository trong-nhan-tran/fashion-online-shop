import axios from "../configs/axiosConfig";

export const apiGetCategories = () => axios({
    url: "/category",
    method: "get"
})