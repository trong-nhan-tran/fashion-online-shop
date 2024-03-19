const express = require("express");
const router = express.Router();
const typeControllers = require("../controllers/type");
const { verifyToken, verifyAdmin } = require("../middlewares/verify_auth");



router.get("/", typeControllers.getTypes);
// router.post("/add", [verifyToken, verifyAdmin], typeControllers.addNewType);

module.exports = router;