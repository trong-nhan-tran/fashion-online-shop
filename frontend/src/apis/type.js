import axios from "../configs/axiosConfig";

export const apiGetTypes = () => axios({
    url: "/type",
    method: "get"
})