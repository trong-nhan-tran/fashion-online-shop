const categoryServices = require("../services/category");
const { internalServerError } = require("../middlewares/handle_errors");
const { validateCategory } = require("../helpers/joi_validate");
 

exports.addNewCategory = async (req, res) => {
    try {
        const { error } = validateCategory(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await categoryServices.createCategory(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}
exports.getCategories = async (req, res) => {
    try {
        const response = await categoryServices.getAllCategories();
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

