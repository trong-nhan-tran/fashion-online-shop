const express = require("express");
const router = express.Router();
const statusControllers = require("../controllers/status");
const { verifyToken, verifyAdmin } = require("../middlewares/verify_auth")

router.get("/", [verifyToken, verifyAdmin] ,statusControllers.getStatuses);

module.exports = router;