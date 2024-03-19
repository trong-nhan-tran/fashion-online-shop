const roleServices = require("../services/role");
const { internalServerError } = require("../middlewares/handle_errors");

exports.getRoles = async (req, res) => {
    try {
      const response = await roleServices.getAllRole();
      return res.status(200).json(response);
  
    }
    catch (error) {
      return internalServerError(res);
    }
  }