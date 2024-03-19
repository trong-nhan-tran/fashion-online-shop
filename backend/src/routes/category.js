const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category");
const { verifyToken, verifyAdmin } = require("../middlewares/verify_auth");



router.get("/", categoryControllers.getCategories);
router.post("/add", [verifyToken, verifyAdmin], categoryControllers.addNewCategory);

module.exports = router;