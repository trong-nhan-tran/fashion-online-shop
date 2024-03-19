const express = require("express");
const router = express.Router();
const sizeControllers = require("../controllers/size");


router.post("/add", sizeControllers.addNewSizeForProduct);

module.exports = router;