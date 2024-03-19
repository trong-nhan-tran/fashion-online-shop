const express = require("express");
const router = express.Router();
const orderDetailControllers = require("../controllers/order_detail");
const { verifyToken } = require("../middlewares/verify_auth")

router.post("/add", verifyToken, orderDetailControllers.addProductToCart);
router.delete("/delete", verifyToken, orderDetailControllers.deleteProductFromCart);
router.get("/:id", verifyToken, orderDetailControllers.getOneOrderDetail);

module.exports = router;