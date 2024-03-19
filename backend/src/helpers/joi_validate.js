const Joi = require('joi');

const user = Joi.object({
  first_name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\u00C0-\u1EF9]+$'))
    .required()
    .messages({
      'string.pattern.base': `"first_name" should only contain alphabetic characters and accented characters.`
    }),
  last_name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\u00C0-\u1EF9]+$'))
    .required()
    .messages({
      'string.pattern.base': `"last_name" should only contain alphabetic characters and accented characters.`
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});


const password = Joi.object({
  password: Joi.string()
    .min(6)
    .required(),
});

const login = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const product = Joi.object({
  product_name: Joi.string()
    .required(),
  description: Joi.string(),
  price: Joi.number()
    .required(),
  category_id: Joi.number()
    .required(),
  type_id: Joi.number()
    .required(),
  thumbnail: Joi.string()
    .required()
});
const updateProduct = Joi.object({
  product_id: Joi.number().required(),
  product_name: Joi.string()
    .required(),
  description: Joi.string(),
  price: Joi.number()
    .required(),
  category_id: Joi.number()
    .required(),
  type_id: Joi.number()
    .required(),
  thumbnail: Joi.string()
    .required()
});
const category = Joi.object({
  category_value: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\u00C0-\u017F]+$'))
    .required()
    .messages({
      'string.pattern.base': `"category_name" should only contain alphabetic characters and accented characters.`
    }),
});

const refreshToken = Joi.object({
  refresh_token: Joi.string()
    .required()

});

const updateUser = Joi.object({
  first_name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\u00C0-\u1EF9]+$'))
    .messages({
      'string.pattern.base': `"first_name" should only contain alphabetic characters and accented characters.`
    }),
  last_name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\u00C0-\u1EF9]+$'))
    .messages({
      'string.pattern.base': `"last_name" should only contain alphabetic characters and accented characters.`
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required(),
  role_id: Joi.string().required()
});

const createUser = Joi.object({
  first_name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\u00C0-\u1EF9]+$'))
    .messages({
      'string.pattern.base': `"first_name" should only contain alphabetic characters and accented characters.`
    }),
  last_name: Joi.string()
    .pattern(new RegExp('^[a-zA-Z\u00C0-\u1EF9]+$'))
    .messages({
      'string.pattern.base': `"last_name" should only contain alphabetic characters and accented characters.`
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required(),
  password: Joi.string()
    .min(6),
  role_id: Joi.string().required()  
});

const Image = Joi.object({
  product_id: Joi.number()
    .required(),
  color_id: Joi.number().required(),
  image_path: Joi.string().required()  
});

const variant = Joi.object({
  product_id: Joi.number()
    .required(),
  color_id: Joi.number().required(),
  size_id: Joi.number().required()
});


const color = Joi.object({
  product_id: Joi.number()
    .required(),
  color_name: Joi.string().required()
});

const size = Joi.object({
  product_id: Joi.number()
    .required(),
  size_name: Joi.string().required()
});


const addProductToCart = Joi.object({
  email: Joi.string().required(),
  product_id: Joi.number()
    .required(),
  color_id: Joi.number().required(),
  size_id: Joi.number().required(),
  quantity: Joi.number().required()
});

const deleteProductFromCart = Joi.object({
  order_id: Joi.number().required(),
  product_id: Joi.number()
    .required(),
  color_id: Joi.number().required(),
  size_id: Joi.number().required(),
});

const placeOrder = Joi.object({
  order_id: Joi.number().required(),
  customer_name: Joi.string()
    .required(),
  address: Joi.string().required(),
  order_phone: Joi.string().required(),
});


exports.validateLogin = data => login.validate(data);
exports.validateUser = data => user.validate(data);
exports.validateProduct = data => product.validate(data);
exports.validateUpdateProduct = data => updateProduct.validate(data);
exports.validateCategory = data => category.validate(data);
exports.validateRefreshToken = data => refreshToken.validate(data);
exports.validateUpdateUser = data => updateUser.validate(data);
exports.validateImage = data => Image.validate(data);
exports.validateColor = data => color.validate(data);
exports.validateSize = data => size.validate(data);
exports.validateVariant = data => variant.validate(data);
exports.validateAddToCart = data => addProductToCart.validate(data);
exports.validateDeleteProductFromCart = data => deleteProductFromCart.validate(data);
exports.validatePlaceOrder = data => placeOrder.validate(data);
exports.validateCreateUser = data => createUser.validate(data);
exports.validatePassword = data => password.validate(data);

