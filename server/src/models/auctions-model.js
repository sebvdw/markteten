import {auctions, delAuction, changeAuctionInfo, delBid} from '../db/auctions.js'
import _ from 'lodash';
import moment from 'moment';

export const getAuctions = (search, under100, wins, oneday, username) => {
    let results = auctions;
    if(!_.isEmpty(search))
    {
        if(search.length > 0) {
            results = results.filter(element => element.itemName.includes(search));
        }
    }
    if (under100 === 'true') {
        results = results.filter(element => getHighestBid(element.bids).amount < 100);
    }
    if (wins === 'true') {
        results = results.filter(element => getHighestBid(element.bids).ownerUsername === username);
    }
    if (oneday === 'true') {
        results = results.filter(element => moment().diff(element.age, 'days') < 1);
    }
    if (results instanceof Array) {
        return results ?? null;
    } else {
        return results == null ? null : [results];
    }
}

export const createAuction = (auction) => {
    auction.id = Date.now();
    auction.age = new Date();
    auction.bids = [];
    auctions.push(auction);
}

export const editAuction = (auction, auctionId) => {
    changeAuctionInfo(auction, auctionId);
}

export const deleteAuction = (auctionId) => {
    // i hate that i have to this, im very annoyed
    delAuction(auctionId);
}

export const addBidToAuction = (bid, auctionId) => {
    let index = auctions.findIndex(a => a.id == auctionId);
    auctions[index].bids.push(bid)
}

export const removeBidFromAuction = (bid, auctionId) => {
    delBid(bid, auctionId)
}

export const findAuction = (auctionId) => {
    return auctions.some(element => element.id == auctionId);
}

const getHighestBid = (bids) => {
    if(bids.length == 0){
        return true;
    }
    return _.maxBy(bids, 'amount');
};