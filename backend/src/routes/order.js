const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order");
const { verifyToken, verifyAdmin } = require("../middlewares/verify_auth")

router.get("/get-cart", verifyToken, orderControllers.getProductsFromCart);
router.delete("/delete/:id", verifyToken, orderControllers.deleteOrder);
router.get("/get-order-history", verifyToken, orderControllers.getOrderHistoryOfMember);
router.put("/place-order", verifyToken, orderControllers.changeCartToOrder);
router.put("/update-status", verifyToken, verifyAdmin, orderControllers.getUpdateStatusOrder);
router.get("/:id", verifyToken, verifyAdmin, orderControllers.getOneOrders);
router.get("/", verifyToken, verifyAdmin, orderControllers.getAllOrders);

module.exports = router;