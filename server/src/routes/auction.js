import express from "express";
import _ from 'lodash';
import GenerateImageApi from '../util/generate-image.js';
import { getAuctions, createAuction, addBidToAuction, deleteAuction, editAuction, removeBidFromAuction, findAuction } from "../models/auctions-model.js";
import { Base64 } from 'js-base64';
import { authenticateToken } from "../middleware/authenticate-token.js";


const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader ?? authHeader.split(' ')[1];
  let arr = token.split('.');
  let result = JSON.parse(Base64.decode(arr[1]));
  let user = result.user;
  res.json(getAuctions(req.query.search, req.query.under100, req.query.wins, req.query.oneday, user.username))
});

router.post('/', authenticateToken, (req, res) => {
  let auction = req.body.auction;
  if(_.isEmpty(auction) || _.isEmpty(auction.itemName) || _.isEmpty(auction.description) || _.isEmpty(auction.owner)) {
    res.status(400)
    .json({
      messages: "Incorrect auction information provided"
    })
    return;
  }
  if(auction.image != undefined) {
    createAuction(auction);
    res.status(201)
    .json({
      messages: "Successfully Posted!"
    })
  } else {
    GenerateImageApi.generateImage(auction.description).then((response) => {
      console.log(response.data[0].url);
      auction.image = response.data[0].url;
      createAuction(auction);
      res.status(201)
      .json({
        messages: "Successfully Posted!"
      })
    });
  }

});

router.post('/:auctionId/bid', authenticateToken, (req, res) => {
  let bid = req.body.bid;
  let auctionId = req.params.auctionId;
  if(_.isNil(bid) || _.isNil(bid.ownerUsername) || _.isNil(bid.amount) || _.isNil(auctionId)) {
    res.status(400)
    .json({
      messages: "Incorrect bid information provided"
    })
    return;
  }
  if(!findAuction(auctionId)) {
    res.status(404)
    .json({
      messages: "Auction not found!"
    })
    return;
  }
  addBidToAuction(bid, auctionId);
  res.status(204)
  .json({
    messages: "Successful Bid!",
  });
});
router.delete('/:auctionId/bid', authenticateToken, (req, res) => {
  let bid = req.body.bid;
  let auctionId = req.params.auctionId;
  if(_.isNil(auctionId)) {
    res.status(400)
    .json({
      messages: "Incorrect bid information provided"
    })
    return;
  }
  if(!findAuction(auctionId)) {
    res.status(404)
    .json({
      messages: "Auction not found!"
    })
    return;
  }
  removeBidFromAuction(bid, auctionId);
  res.status(202)
  .json({
    messages: "Delete Successful!",
  });
});

router.delete('/:auctionId', authenticateToken, (req, res) => {
  let auctionId = req.params.auctionId;
  if(_.isNil(auctionId)) {
    res.status(400)
    .json({
      messages: "Incorrect auction information provided"
    })
    return;
  }
  if(!findAuction(auctionId)) {
    res.status(404)
    .json({
      messages: "Auction not found!"
    })
    return;
  }
  
  deleteAuction(auctionId);
  res.status(202)
  .json({
    messages: "Delete Successful!",
  });
});

router.put('/:auctionId', authenticateToken, (req, res) => {
  let auction = req.body.auction;
  let auctionId = req.params.auctionId;
  if(_.isEmpty(auction) || _.isEmpty(auction.itemName) || _.isEmpty(auction.description) || _.isEmpty(auction.owner) || _.isNil(auctionId)) {
    res.status(400)
    .json({
      messages: "Incorrect auction information provided"
    })
    return;
  }
  if(!findAuction(auctionId)) {
    res.status(404)
    .json({
      messages: "Auction not found!"
    })
    return;
  }
  editAuction(auction, auctionId);
  res.status(204)
  .json({
    messages: "Successfully Updated!"
  });
});

export default router;