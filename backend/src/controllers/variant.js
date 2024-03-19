const variantServices = require("../services/variant");
const { internalServerError, badRequestError } = require("../middlewares/handle_errors");
const  { validateVariant } = require("../helpers/joi_validate")

exports.getVariantsByProductID = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return badRequestError("Product ID is required", res)
        }
        const response = await variantServices.getVariantOfProduct(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.addNewVariantForProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateVariant(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await variantServices.createVariant(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.deleteVariantOfProduct = async (req, res) => {
    try {
        const { error } = validateVariant(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await variantServices.deleteVariant(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}
