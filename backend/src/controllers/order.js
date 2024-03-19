const orderServices = require("../services/order");
const { validatePlaceOrder } = require("../helpers/joi_validate")
const { internalServerError, badRequestError } = require("../middlewares/handle_errors")

exports.getProductsFromCart = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return badRequestError("Email is require", res);
        const response = await orderServices.getProductCart(email);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.changeCartToOrder = async (req, res) => {
    try {
        const { error } = validatePlaceOrder(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await orderServices.placeOrder(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
};


exports.getOrderHistoryOfMember = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return badRequestError("Email is require", res);
        const response = await orderServices.getOrderHistory(email);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}
exports.getAllOrders = async (req, res) => {
    try {
        const response = await orderServices.getAllOrder(req.query);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}
exports.getOneOrders = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) return badRequestError("Order Id  is required")
        const response = await orderServices.getOneOrder(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.getUpdateStatusOrder = async (req, res) => {
    try {
        const {order_id, status_id} = req.body;
        if(!order_id) return badRequestError("Order Id  is required")
        if(!status_id) return badRequestError("Status Id  is required")
        const response = await orderServices.getUpdateStatusOrder({order_id, status_id});
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.deleteOrder= async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return badRequestError("Order ID is required", res)
        }
        const response = await orderServices.deleteOrder(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}