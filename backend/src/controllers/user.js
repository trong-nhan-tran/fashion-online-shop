const userServices = require("../services/user");
const { internalServerError, badRequestError } = require("../middlewares/handle_errors");
const { validateUpdateUser, validateCreateUser } = require("../helpers/joi_validate")

//user login
exports.getCurrentUser = async (req, res) => {
  try {
    const { email } = req.user;
    const response = await userServices.getOneUser(email);
    return res.status(200).json(response);

  }
  catch (error) {
    return internalServerError(res);
  }
}
exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userServices.getOneUser(id);
    return res.status(200).json(response);

  }
  catch (error) {
    return internalServerError(res);
  }
}

exports.getUserList = async (req, res) => {
  try {
    //console.log(error)
    const response = await userServices.getAllUser(req.query);
    return res.status(200).json(response);

  }
  catch (error) {
    return internalServerError(res);
  }
}



exports.updateUser = async (req, res) => {
  try {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return badRequestError(error.details[0]?.message, res)
    }
    const response = await userServices.updateUser(req.body);
    return res.status(200).json(response);

  }
  catch (error) {
    return internalServerError(res);
  }
};

exports.addNewUser = async (req, res) => {
  try {
    const { error } = validateCreateUser(req.body);
    if (error) {
      return badRequestError(error.details[0]?.message, res)
    }
    const response = await userServices.createUser(req.body);
    return res.status(200).json(response);

  }
  catch (error) {
    return internalServerError(res);
  }
}
exports.deleteUser = async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    if (!id) {
      return badRequestError("Email user is required", res)
    }
    const response = await userServices.deleteUser(id);
    return res.status(200).json(response);

  }
  catch (error) {
    return internalServerError(res);
  }
}

