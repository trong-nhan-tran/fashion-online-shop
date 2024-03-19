import axios from "../configs/axiosConfig";

export const apiAddSize = (data) => axios({
    url: "/size/add",
    method: "post",
    data
})