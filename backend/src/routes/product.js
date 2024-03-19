const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product");
const { verifyAdmin, verifyToken } = require("../middlewares/verify_auth")


// router.get("/", productControllers.getCurrentProduct);
router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProduct);
router.post("/add",[verifyToken, verifyAdmin], productControllers.addNewProduct);
router.delete("/:id",[verifyToken, verifyAdmin], productControllers.deleteProduct);
router.put("/update",[verifyToken, verifyAdmin], productControllers.updateProduct);

module.exports = router;