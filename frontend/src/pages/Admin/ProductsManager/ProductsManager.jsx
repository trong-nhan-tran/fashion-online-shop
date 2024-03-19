import { NavLink } from "react-router-dom";
import { adminRoute } from "../../../routes";
import { useState } from "react";
import { useEffect } from "react";
import { apiGetProducts, apiDeleteProduct } from "../../../apis";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [tempSearchTerm, setTempSearchTerm] = useState("");
    const handleSearchChange = (event) => {
        setTempSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: tempSearchTerm });
    }
    const fetchProducts = async (params) => {
        const response = await apiGetProducts(params);
        if (!response.err) {
            setProducts(response)
        }

    }
    const search = searchParams.get("search");

    useEffect(() => {
        fetchProducts({
            name: search
        })
    }, [search]);

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Remove this product?",
            icon: "warning",
            showCancelButton: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                const response = await apiDeleteProduct(id);
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
                render()

            }
        })
    }
    return (
        <>
            <h1 className="manager-header">Product Manager</h1>
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


                    <NavLink className="button-submit crate-new-product" to={"/admin/" + adminRoute.ADD_PRODUCT}>
                        <span>Add New Product</span>
                    </NavLink>
                </form>


                <table className="main-table">
                    <thead>
                        <tr className="table-row-header">
                            <td className="table-column-header">No</td>
                            <td className="table-column-header">Product ID</td>
                            <td className="table-column-header">Product</td>
                            <td className="table-column-header">Price</td>
                            <td className="table-column-header">Category</td>
                            <td className="table-column-header">Type</td>
                            <td className="table-column-header">Action</td>

                        </tr>
                    </thead>

                    <tbody>
                        {products?.productList?.map((el, idx) => {
                            return (
                                <tr className="table-row" key={el.product_id}>
                                    <td className="column-1">{idx + 1}</td>
                                    <td className="column-1">{el.product_id}</td>
                                    <td >
                                        <div className="name-and-image-product">
                                            <img src={el.thumbnail} alt="" className="product-image" />
                                            {el.product_name}
                                        </div>
                                    </td>
                                    <td className="column-4">${el.price}</td>
                                    <td className="column-5">{el.categoryData.category_name}</td>
                                    <td className="column-5">{el.typeData.type_name}</td>
                                    <td className="action-button-container">
                                        <Link to={`update/${el.product_id}`}>
                                            <span title="Edit"><i className="bi bi-pencil-square"></i></span>
                                        </Link>
                                        <Link to={`variant/${el.product_id}`}>
                                            <span title="Variants"><i className="bi-menu-button-fill"></i></span>
                                        </Link>

                                        <Link to={`color/${el.product_id}`}>
                                            <span title="Colors"><i className="bi bi-palette"></i></span>
                                        </Link>
                                        <span title="Delete" onClick={() => handleDeleteProduct(el.product_id)}><i className="bi-trash3"></i></span>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Products;