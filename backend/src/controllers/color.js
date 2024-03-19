const colorServices = require("../services/color");
const { internalServerError, badRequestError } = require("../middlewares/handle_errors");
const  {validateColor} = require("../helpers/joi_validate")

exports.addNewColorForProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateColor(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await colorServices.createColorOfProduct(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}