import axios from "../configs/axiosConfig";

export const apiRegister = (data) => axios({
    url: "/auth/register",
    method: "post",
    data
})
export const apiLogin = (data) => axios({
    url: "/auth/login",
    method: "post",
    data
})
export const apiGetCurrent = () => axios({
    url: "/user/current",
    method: "get",
})
export const apiChangePassword = (data) => axios({
    url: "/auth/change-password",
    method: "put",
    data
})
export const apiChangeInfor = (data) => axios({
    url: "/auth/change-infor",
    method: "put",
    data
})