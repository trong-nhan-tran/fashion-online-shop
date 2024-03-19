const statusServices = require("../services/status");
const { internalServerError } = require("../middlewares/handle_errors");

exports.getStatuses = async (req, res) => {
    try {
      const response = await statusServices.getAllStatuses();
      return res.status(200).json(response);
  
    }
    catch (error) {
      return internalServerError(res);
    }
  }