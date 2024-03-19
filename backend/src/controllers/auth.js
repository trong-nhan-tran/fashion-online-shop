const authServices = require("../services/auth");
const { internalServerError,badRequestError } = require("../middlewares/handle_errors");
const validators = require("../helpers/joi_validate");
 
exports.register = async (req, res) => {
  try {
    const { error } = validators.validateUser(req.body);
    if (error) return badRequestError(error.details[0]?.message, res);
    const response = await authServices.register(req.body, res);
    return res.status(200).json(response); 

  } 
  catch (error) {
    return internalServerError(res);
  }
}


exports.login = async (req, res) => {
  try {
    const { error } = validators.validateLogin(req.body);
    if (error) return badRequestError(error.details[0]?.message, res);
    const response = await authServices.login(req.body, res);

    return res.status(200).json(response); 

  } 
  catch (error) {
    return internalServerError(res);
  }
}

exports.refreshToken = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) return badRequestError("No refresh token in cookie", res);

    const { error } = validators.validateRefreshToken({refresh_token: cookie.refreshToken});
    if (error) return badRequestError(error.details[0]?.message, res);

    const response = await authServices.refreshTokenService(cookie.refreshToken);
    return res.status(200).json(response); 

  } 
  catch (error) {
    return internalServerError(res);
  }
}



exports.logout = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) return badRequestError("No refresh token in cookie", res);

    const { error } = validators.validateRefreshToken({refresh_token: cookie.refreshToken});
    if (error) return badRequestError(error.details[0]?.message, res);

    const response = await authServices.logout(cookie.refreshToken, res);
    return res.status(200).json(response); 

  } 
  catch (error) {
    return internalServerError(res);
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { email } = req.user;
    const { current_password, new_password } = req.body;
    const { error } = validators.validatePassword({password: new_password});
    if (error) return badRequestError(error.details[0]?.message, res);

    const response = await authServices.updatePassword({email, current_password, new_password});
    return res.status(200).json(response); 

  } 
  catch (error) {
    console.log(error)
    return internalServerError(res);
  }
}

exports.changeInfor = async (req, res) => {
  try {
    const { email } = req.user;
    const { first_name, last_name, phone } = req.body;
    const { error } = validators.validateUpdateUser({
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone
    });
    if (error) return badRequestError(error.details[0]?.message, res);

    const response = await authServices.updateInformation({email, first_name, last_name, phone});
    return res.status(200).json(response); 

  } 
  catch (error) {
    console.log(error)
    return internalServerError(res);
  }
}