
import { apiGetAllOrder } from "../../../apis";
import { useState, useEffect } from "react";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [tempSearchTerm, setTempSearchTerm] = useState("");
    const handleSearchChange = (event) => {
        setTempSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: tempSearchTerm });
    }
    const fetchOrders = async (params) => {
        const response = await apiGetAllOrder(params);
        if (!response.err) {
            setOrders(response.orders)
        }

    }

    const search = searchParams.get("search");
    useEffect(() => {
        fetchOrders({
            search: search
        })
    }, [search, orders]);
    return (
        <>
            <h1 className="manager-header">Order Manager</h1>
            <div className="manager-body">
                <form className="action-search-container"
                    onSubmit={handleSearchSubmit}
                >
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
                </form>


                <table className="main-table">
                    <thead>
                        <tr className="table-row-header">
                            <td className="table-column-header">No</td>
                            <td className="table-column-header">Order ID</td>
                            <td className="table-column-header">Customer</td>
                            <td className="table-column-header">Phone number</td>
                            <td className="table-column-header">Address</td>
                            <td className="table-column-header">Date of order</td>
                            <td className="table-column-header">Status</td>
                            <td className="table-column-header">Action</td>

                        </tr>
                    </thead>

                    <tbody>
                        {orders && orders?.map((order, idx) => {
                            return (
                                <tr className="table-row" key={order.order_id}>
                                    <td className="column-1">{idx + 1}</td>
                                    <td className="column-1">{order.order_id}</td>
                                    <td className="column-2">{order.customer_name}</td>
                                    <td className="column-4">{order.order_phone}</td>
                                    <td className="column-5">{order.address}</td>
                                    <td className="column-6">{moment(order.createdAt).format('HH:mm, DD/MM/YYYY')}</td>
                                    <td className="column-7">{order.statusData.status_name}</td>
                                    <td className="action-button">
                                        <Link to={`update/${order.order_id}`}>
                                            <span title="Edit"><i className="bi bi-pencil-square"></i></span>
                                        </Link>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default Orders;