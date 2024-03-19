const user = require("./user");
const auth = require("./auth");
const product = require("./product");
const category = require("./category");
const type = require("./type");
const image = require("./image");
const color = require("./color");
const productColor = require("./product_color");
const size = require("./size");
const productSize = require("./product_size");
const variant = require("./variant");
const orderDetail = require("./order_detail");
const order = require("./order");
const role = require("./role");
const status = require("./status");
const { notFoundRoute } = require("../middlewares/handle_errors");
const initRoutes = (app) =>{
    app.use("/api/user", user);
    app.use("/api/auth", auth);
    app.use("/api/product", product);
    app.use("/api/category", category);
    app.use("/api/type", type);
    app.use("/api/image", image);
    app.use("/api/product-color", productColor);
    app.use("/api/color", color);
    app.use("/api/size", size);
    app.use("/api/product-size", productSize);
    app.use("/api/variant", variant);
    app.use("/api/order-detail", orderDetail);
    app.use("/api/order", order);
    app.use("/api/role", role);
    app.use("/api/status", status);

    app.use(notFoundRoute);
};

module.exports = initRoutes;