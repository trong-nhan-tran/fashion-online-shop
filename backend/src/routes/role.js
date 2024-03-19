const express = require("express");
const router = express.Router();
const roleControllers = require("../controllers/role");
const { verifyToken, verifyAdmin } = require("../middlewares/verify_auth")

router.get("/", [verifyToken, verifyAdmin] ,roleControllers.getRoles);

module.exports = router;