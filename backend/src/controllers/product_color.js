const productColorServices = require("../services/product_color");
const { internalServerError, badRequestError } = require("../middlewares/handle_errors");


exports.getColorOfOneProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id){
            return badRequestError("Product ID is required", res)
        }
        const response = await productColorServices.getProductColor(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.deleteColorOfOneProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id){
            return badRequestError("Product ID is required", res)
        }
        const response = await productColorServices.getProductColor(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}