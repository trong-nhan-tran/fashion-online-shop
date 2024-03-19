import axios from "../configs/axiosConfig";

export const apiAllRole = () => axios({
    url: "/role",
    method: "get"
})