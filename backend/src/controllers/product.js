const productServices = require("../services/product");
const { internalServerError } = require("../middlewares/handle_errors");
const { validateProduct, validateUpdateProduct } = require("../helpers/joi_validate");
const { badRequestError } = require("../middlewares/handle_errors") ;
 
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) return badRequestError("ID product is required", res)
        const response = await productServices.getOneProduct(id);
        return res.status(200).json(response);

    } 
    catch (error) {
        return internalServerError(res);
    }
}
 
exports.getProducts = async (req, res) => {
    try {
        console.log(req.query)
        const { queries } = req.query; // Truy cập vào thuộc tính queries
        const response = await productServices.getProducts(queries); // Sử dụng queries thay vì req.query
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res); 
    }
}




exports.addNewProduct = async (req, res) => {
    try {
        const { error } = validateProduct(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await productServices.createProduct(req.body);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return badRequestError("Product ID is required", res)
        }
        const response = await productServices.deleteProduct(id);
        return res.status(200).json(response);

    }
    catch (error) {
        return internalServerError(res);
    }
}
exports.updateProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateUpdateProduct(req.body);
        if (error) return badRequestError(error.details[0]?.message, res);
        const response = await productServices.updateProduct(req.body);
        return res.status(200).json(response);


    }
    catch (error) {
        return internalServerError(res);
    }
}
