import { useEffect, useState } from "react";
import { apiDeleteUser, apiGetUsers } from "../../../apis";
import { NavLink, Link } from "react-router-dom";
import { adminRoute } from "../../../routes";
import moment from "moment";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [tempSearchTerm, setTempSearchTerm] = useState("");
    const handleSearchChange = (event) => {
        setTempSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: tempSearchTerm });
    }

    const search = searchParams.get("search");
    const fetchUsers = async (params) => {
        const response = await apiGetUsers(params);
        if (response.err == 0) {
            setUsers(response)
        }

    }
    useEffect(() => {
        fetchUsers({
            search: search
        })

    }, [search]);

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Remove this user?",
            icon: "warning",
            showCancelButton: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                const response = await apiDeleteUser(id);
                if (!response.err) {
                    toast.success(response.mess, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    toast.error(response.mess, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                fetchUsers({
                    search: search
                })
            }
        })
    }
    return (
        <>
            <h1 className="manager-header">User Manager</h1>
            <div className="manager-body">
                <form className="action-search-container" onSubmit={handleSearchSubmit}>
                    <input className="search-box-input"
                        type="text"
                        placeholder="Enter to search"
                        onChange={handleSearchChange}
                    />
                    <button className="button-submit search-submit"
                        type="submit"
                    >
                        <i className="bi-search "></i>
                    </button>
                    <NavLink className="button-submit crate-new-product" to={"/admin/" + adminRoute.ADD_USER}>
                        <span>Add New User</span>
                    </NavLink>
                </form>


                <table className="main-table">
                    <thead>
                        <tr className="table-row-header">
                            <td className="table-column-header">No</td>
                            <td className="table-column-header">First Name</td>
                            <td className="table-column-header">Last Name</td>
                            <td className="table-column-header">Email</td>
                            <td className="table-column-header">Phone</td>
                            <td className="table-column-header">Level</td>
                            <td className="table-column-header">Created At</td>
                            <td className="table-column-header">Updated At</td>
                            <td className="table-column-header">Action</td>

                        </tr>
                    </thead>

                    <tbody>
                        {users?.users?.map((el, idx) => {
                            return (
                                <tr className="table-row" key={el.email}>
                                    <td>{idx + 1}</td>
                                    <td>{el.first_name}</td>
                                    <td>{el.last_name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.phone}</td>
                                    <td>{el.roleData.role_name}</td>
                                    <td>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(el.updatedAt).format('DD/MM/YYYY')}</td>
                                    <td className="action-button-container">
                                        <Link to={`update/${el.email}`}>
                                            <span title="Edit"><i className="bi bi-pencil-square"></i></span>
                                        </Link>
                                        <span title="Delete" onClick={() => handleDeleteUser(el.email)}><i className="bi-trash3"></i></span>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>

            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Users;