const express = require("express");
const router = express.Router();
const imageControllers = require("../controllers/image");

router.get("/:id", imageControllers.getImageByProductID);
router.post("/add", imageControllers.addNewProductImage);
router.delete("/delete", imageControllers.deleteProductImage);
router.get("/group-by/:id", imageControllers.getImageAndGroupByColor);

module.exports = router;