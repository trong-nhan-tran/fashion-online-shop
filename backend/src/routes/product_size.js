const express = require("express");
const router = express.Router();
const productSizeControllers = require("../controllers/product_size");

router.get("/:id", productSizeControllers.getSizeOfOneProduct)

module.exports = router;