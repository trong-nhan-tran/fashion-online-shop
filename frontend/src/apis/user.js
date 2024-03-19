import axios from "../configs/axiosConfig";

export const apiGetUsers = (params) => axios({
    url: "/user",
    method: "get",
    params
});
export const apiGetOneUser = (email) => axios({
    url: "/user/" + email,
    method: "get"
});

export const apiAddNewUser = (data) => axios({
    url: "/user/add",
    method: "post",
    data
})
export const apiDeleteUser = (email) => axios({
    url: "/user/"+ email,
    method: "delete",
})
export const apiUpdateUser = (data) => axios({
    url: "/user/update",
    method: "put",
    data
})