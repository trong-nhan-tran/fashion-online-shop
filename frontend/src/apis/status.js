import axios from "../configs/axiosConfig";

export const apiGetStatuses = () => axios({
    url: "/status/",
    method: "get"
})