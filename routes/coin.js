const router = require("express").Router();
const coinController = require("../controllers/coin");

router.post("/topup", coinController.topup);
router.post("/transfer", coinController.transfer);

module.exports = router;
