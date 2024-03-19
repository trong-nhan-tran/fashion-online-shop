const express = require("express");
const router = express.Router();
const colorControllers = require("../controllers/color");


router.post("/add", colorControllers.addNewColorForProduct);

module.exports = router;