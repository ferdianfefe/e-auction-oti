const router = require("express").Router();
const userController = require("../controllers/user");
const { verifyToken } = require("../middlewares/authenticated");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/me", verifyToken, userController.getMyProfile);

module.exports = router;
