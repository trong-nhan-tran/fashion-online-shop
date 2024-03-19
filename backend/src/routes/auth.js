const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const { verifyToken} = require("../middlewares/verify_auth")

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/refresh-token", auth.refreshToken);
router.get("/logout", verifyToken, auth.logout);
router.put("/change-password",verifyToken, auth.changePassword);
router.put("/change-infor",verifyToken, auth.changeInfor);

module.exports = router;