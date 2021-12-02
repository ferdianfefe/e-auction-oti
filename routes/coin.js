const router = require("express").Router();
const coinController = require("../controllers/coin");
const { verifyToken } = require("../middlewares/authenticated");

router.post("/topup", verifyToken, coinController.topup);
router.post("/transfer", verifyToken, coinController.transfer);

module.exports = router;
