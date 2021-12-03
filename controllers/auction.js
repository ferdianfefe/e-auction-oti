"use strict";
const moment = require("moment");
const Auction = require("../models/auction");

async function createAuction(req, res) {
  const { title, itemName, images, startingPrice } = req.body;
  const auction = new Auction({
    title,
    itemName,
    images: images.map((image) => {
      return {
        name: image.name,
        path: image.path,
      };
    }),
    startingPrice,
    currentBid: startingPrice,
    user: req.user._id,
    startDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    endDate: null
  });

  await auction.save();

  return res.status(200).json({
    success: true,
    message: "Auction created successfully",
  });
}

async function getAllAuctions(req, res) {
  const auctions = await Auction.find({ user: { $ne: req.user._id } });

  return res.status(200).json({
    success: true,
    value: {
      auctions,
    },
  });
}

async function getAuctionById(req, res) {
  const { id } = req.params;
  const auction = await Auction.findOne({ _id: id }).populate("user").populate("participants");

  return res.status(200).json({
    success: true,
    value: {
      auction,
    },
  });
}

async function getAuctionByUserID(req, res) {
  const { id } = req.params;
  console.log(id);

  const auctions = await Auction.find({ user: id }).populate("user");

  return res.status(200).json({
    success: true,
    value: {
      auctions,
    },
  });
}

async function updateAuction(req, res) {
  const { id } = req.params;
  const { title, itemName, images, startingPrice, currentBid } = req.body;

  const auction = await Auction.findById(id);

  if (!auction) {
    return res.status(404).json({
      success: false,
      message: "Auction not found",
    });
  }

  auction.title = title;
  auction.itemName = itemName;
  auction.images = images.map((image) => {
    return {
      name: image.name,
      path: image.path,
    };
  });
  auction.startingPrice = startingPrice;
  auction.currentBid = currentBid;

  await auction.save();

  return res.status(200).json({
    success: true,
    message: "Auction updated successfully",
  });
}

async function deleteAuction(req, res) {
  const { id } = req.params;

  const auction = await Auction.findById(id);

  if (!auction) {
    return res.status(404).json({
      success: false,
      message: "Auction not found",
    });
  }

  await auction.remove();

  return res.status(200).json({
    success: true,
    message: "Auction deleted successfully",
  });
}

async function endAuction(req, res){
  const { id } = req.params;

  const auction = await Auction.findById(id);

  if (!auction) {
    return res.status(404).json({
      success: false,
      message: "Auction not found",
    });
  }

  auction.endDate = moment().format("YYYY-MM-DD HH:mm:ss");

  await auction.save();

  return res.status(200).json({
    success: true,
    message: "Auction ended successfully",
  });
}

async function placeBid(req, res) {
  const { bid, auctionId } = req.body;

  const auction = await Auction.findById(auctionId);

  if (!auction) {
    return res.status(404).json({
      success: false,
      message: "Auction not found",
    });
  }

  if (auction.currentBid >= bid) {
    return res.status(400).json({
      success: false,
      message: "Bid must be greater than highest bid",
    });
  }

  auction.currentBid = bid;

  await auction.save();

  console.log("Bid placed successfully");

  if(!auction.participants.includes(req.user._id)){
    auction.participants.push(req.user._id);
    await auction.save();
  }

  return res.status(200).json({
    success: true,
    message: "Bid added successfully",
  });
}

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctionById,
  getAuctionByUserID,
  updateAuction,
  deleteAuction,
  endAuction,
  placeBid,
};
