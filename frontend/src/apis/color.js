import axios from "../configs/axiosConfig";

export const apiAddColor = (data) => axios({
    url: "/color/add",
    method: "post",
    data
})