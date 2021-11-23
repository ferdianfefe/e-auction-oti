"use strict";

const router = require("express").Router();
const { verifyToken } = require("../middlewares/authenticated");
const auctionController = require("../controllers/auction");

router.post("", verifyToken, auctionController.createAuction);
router.get("", verifyToken, auctionController.getAllAuctions);
router.get("/:id", verifyToken, auctionController.getAuctionById);

module.exports = router;
