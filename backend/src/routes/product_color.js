const express = require("express");
const router = express.Router();
const productColorControllers = require("../controllers/product_color");

router.get("/:id", productColorControllers.getColorOfOneProduct)

module.exports = router;