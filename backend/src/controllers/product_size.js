const productSizeServices = require("../services/product_size");
const { internalServerError, badRequestError } = require("../middlewares/handle_errors");


exports.getSizeOfOneProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id){
            return badRequestError("Product ID is required", res)
        }
        const response = await productSizeServices.getSizeOfProduct(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}