const express = require("express");
const router = express.Router();
const variantControllers = require("../controllers/variant");

router.get("/:id", variantControllers.getVariantsByProductID);
router.post("/add", variantControllers.addNewVariantForProduct);
router.delete("/delete", variantControllers.deleteVariantOfProduct);

module.exports = router;