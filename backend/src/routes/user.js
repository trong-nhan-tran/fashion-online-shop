const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const { verifyToken, verifyAdmin } = require("../middlewares/verify_auth");

router.get("/current", verifyToken, userControllers.getCurrentUser);
router.get("/", [verifyToken, verifyAdmin],userControllers.getUserList);
router.get("/:id", [verifyToken, verifyAdmin],userControllers.getOneUser);
router.put("/update", [verifyToken, verifyAdmin],userControllers.updateUser);
router.post("/add", [verifyToken, verifyAdmin],userControllers.addNewUser);
router.delete("/:id", [verifyToken, verifyAdmin],userControllers.deleteUser);

module.exports = router;