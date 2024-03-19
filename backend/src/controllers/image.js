const imageServices = require("../services/image");
const { internalServerError, badRequestError } = require("../middlewares/handle_errors");
const  {validateImage} = require("../helpers/joi_validate")

exports.getImageByProductID = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return badRequestError("Product ID is required", res)
        }
        const response = await imageServices.getImageWithColor(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}
exports.getImageAndGroupByColor = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return badRequestError("Product ID is required", res)
        }
        const response = await imageServices.getImageAndGroupByColor(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.addNewProductImage = async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateImage(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await imageServices.createImage(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.deleteProductImage = async (req, res) => {
    try {
        const { error } = validateImage(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await imageServices.deleteImage(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}
