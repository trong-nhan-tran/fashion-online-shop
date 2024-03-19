const orderDetailServices = require("../services/order_detail");
const { validateAddToCart, validateDeleteProductFromCart } = require("../helpers/joi_validate")
const {internalServerError} = require("../middlewares/handle_errors")

exports.addProductToCart = async (req, res) => {
    try {
        const { error } = validateAddToCart(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await orderDetailServices.addProductToCart(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.deleteProductFromCart = async (req, res) => {
    try {
        const { error } = validateDeleteProductFromCart(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await orderDetailServices.deleteProductFromCart(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.getOneOrderDetail = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) return badRequestError("Order Id is required", res);
        const response = await orderDetailServices.getOneOrderDetail(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

