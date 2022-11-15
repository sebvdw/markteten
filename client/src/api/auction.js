let endpoint = "http://localhost:5000"
let token = localStorage.getItem('token') ?? null;


export class AuctionApi {
    getAuctions(search, under100, wins, oneday) {
        return fetch(endpoint+`/auction/?search=${search}&under100=${under100}&wins=${wins}&oneday=${oneday}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => response.json())
    }
    createAuction(auction) {
        return fetch(endpoint+'/auction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({auction: auction}),
        }).then((response) => response.json())
    }
    deleteAuction(auctionId) {
        return fetch(endpoint+`/auction/${auctionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => response.json())
    }
    editAuction(auction) {
        return fetch(endpoint+`/auction/${auction.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({auction: auction}),
        }).then((response) => response.json())
    }
    addBidToAuction(bid, auctionId) {
        return fetch(endpoint+`/auction/${auctionId}/bid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({bid: bid})
        }).then((response) => response.json())
    }
    removeBidFromAuction(bid, auctionId) {
        return fetch(endpoint+`/auction/${auctionId}/bid`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({bid: bid})
        }).then((response) => response.json())
    }
}



export default new AuctionApi();