"use strict";

const router = require("express").Router();
const { verifyToken } = require("../middlewares/authenticated");
const auctionController = require("../controllers/auction");

router.post("", verifyToken, auctionController.createAuction);
router.get("", verifyToken, auctionController.getAllAuctions);
router.get("/user/:id", verifyToken, auctionController.getAuctionByUserID);
router.put("/end/:id", verifyToken, auctionController.endAuction);
router.get("/:id", verifyToken, auctionController.getAuctionById);
router.put("/:id", verifyToken, auctionController.updateAuction);
router.delete("/:id", verifyToken, auctionController.deleteAuction);
router.post("/:id", verifyToken, auctionController.placeBid);

module.exports = router;
