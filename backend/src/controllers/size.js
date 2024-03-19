const sizeServices = require("../services/size");
const { internalServerError, badRequestError } = require("../middlewares/handle_errors");
const  { validateSize } = require("../helpers/joi_validate")

exports.addNewSizeForProduct = async (req, res) => {
    try {
        const { error } = validateSize(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await sizeServices.createSizeOfProduct(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}