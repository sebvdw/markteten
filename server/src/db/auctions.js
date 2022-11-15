import _ from "lodash";

export let auctions = ([
    {
        id: 1,
        owner: "user",
        itemName: "pizza",
        description: "As good as new.",
        age: new Date(),
        image: "https://openai-labs-public-images-prod.azureedge.net/user-cJCCzHzaXroreAX31HDKgwXP/generations/generation-M17KGDPv5bsoCIQbL1nrO3FG/image.webp",
        bids: [
            {
                ownerUsername: "test",
                amount: 500
            },
            {
                ownerUsername: "test2",
                amount: 400
            },
            {
                ownerUsername: "test3",
                amount: 300
            },
            {
                ownerUsername: "test4",
                amount: 200
            },
            {
                ownerUsername: "test5",
                amount: 100
            },
        ]
    },
    {
        id: 2,
        owner: "user",
        itemName: "pie",
        description: "Pretty decent, only one slice taken out of it",
        age: new Date('1995-12-17T03:24:00'),
        image: "https://openai-labs-public-images-prod.azureedge.net/user-cJCCzHzaXroreAX31HDKgwXP/generations/generation-xbKW7TyarXZzwoixD9qTEF3E/image.webp",
        bids: [
            {
                ownerUsername: "admin",
                amount: 50
            },
        ]
    },
])



export const delAuction = (auctionId) => {
    auctions = auctions.filter(a => a.id != auctionId);
}

export const changeAuctionInfo = (auction, auctionId) => {
    let index = auctions.findIndex(a => a.id == auctionId);
    auctions[index] = auction;
}

export const delBid = (bid, auctionId) => {
    let index = auctions.findIndex(a => a.id == auctionId);
    auctions[index].bids = auctions[index].bids.filter(a => !_.isEqual(a, bid));
}