<script>
// @ts-nocheck
import AuctionApi from '../api/auction';
import { maxBy } from 'lodash-es';
import moment from 'moment';
import Modal from './modal/Modal.svelte';
import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let auctionItem;
export let user;
let bid = {};
let message = "";
let canEdit = false;

$: if(user.username === auctionItem.owner || user.role === 'admin') {
  canEdit = true;
}

const getHighestBid = () => {
  if(auctionItem.bids.length == 0){
    return;
  }
  return maxBy(auctionItem.bids, 'amount').amount;
};

onMount(() => {
  auctionItem.bids = auctionItem.bids.sort((a, b) => {
    return b.amount - a.amount;
  });
})

const sortArray = () => {
  auctionItem.bids = auctionItem.bids.sort((a, b) => {
    return b.amount - a.amount;
  });
}

const placeBid = () => {
  message = "";
  if(bid.amount <= getHighestBid()) {
    message = "You need to place a higher bid!"
    return;
  }
  bid.ownerUsername = user.username;
  auctionItem.bids.push(bid);
  dispatch('refresh');
  sortArray();
  AuctionApi.addBidToAuction(bid, auctionItem.id);
  bid = {};
}

const delBid = (bid) => {
  dispatch('refresh');
  sortArray();
  AuctionApi.removeBidFromAuction(bid, auctionItem.id);
  bid = {};
}

const delAuction = () => {
  toggleAuctionModal();
  dispatch('delete', {
    aucId: auctionItem.id
  });
  AuctionApi.deleteAuction(auctionItem.id);
}

const saveAuction = () => {
  toggleAuctionModal();
  dispatch('refresh');
  AuctionApi.editAuction(auctionItem);
}

export const getDescription = () => {
  return auctionItem.description.toString().slice(0,40) + (auctionItem.description.length > 40 ? "..." : "")
}

let showBidM = false;
const toggleBidModal = () => {
  showBidM =!showBidM
};

let showAuctionModal = false;
const toggleAuctionModal = () => {
  showAuctionModal =!showAuctionModal
};
    
</script>
<style>
/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
<div class="p-4 basis-1/3">
  <div class="c-card h-[452px]  block bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden cursor-pointer">
    <div on:click={() => toggleAuctionModal()}>
      <div class="relative h-[12rem] pb-48 overflow-hidden">
        <img class="absolute inset-0 h-full w-full object-cover" src={auctionItem.image} alt="">
      </div>
      <div class="p-4 h-[9rem]">
        <h2 class="mt-2 mb-2  font-bold">{ auctionItem.itemName }</h2>
        <p class="text-sm">{getDescription()}</p>
        {#if auctionItem.bids.length == 0}
        <div class="mt-3 flex items-center">
          <span class="text-sm font-semibold">No Bids!</span>
        </div>
        {:else}
        <div class="mt-3 flex items-center">
          &nbsp;<span class="text-sm font-semibold">€&nbsp; {getHighestBid()}</span> 
        </div>
        {/if}
      </div>
      <div class="p-4 border-t border-b text-gray-700">
        <span class="flex justify-center mb-1">
          <i style="padding-top: 4.99px;" class="far fa-clock fa-fw mr-2 text-gray-900"></i> {moment(auctionItem.age).endOf().add(3, 'days').fromNow()}
        </span>     
      </div>
    </div>
    <div class="p-4 flex justify-center text-gray-600 hover:bg-slate-100 cursor-pointer" on:click={() => toggleBidModal()}>
      <span class="ml-2 font-bold" >Place a Bid</span>
    </div>
  </div>
</div>

<Modal
open={showBidM}
  on:close={() => toggleBidModal()}>
  <svelte:fragment slot="body">
    <div class="flex p-8 md:p-0 max-h-[320px]" >
      <div class="">
        <img class="h-full rounded-l-lg" style="width: 39rem;" src={auctionItem.image} alt="">
      </div>
      <div class="pt-2 w-full md:p-4 text-center md:text-left">
        <h3 class="text-xl font-medium text-gray-900">Add Bid</h3>
        <p class="mb-3 text-sm font-normal text-gray-500">
          {#if message.length > 0}
            <span class="mb-3 text-sm font-bold text-red-500">{message}</span>
            {:else if moment().diff(auctionItem.age, 'days') > 3}
            <span class="mb-3 text-sm font-bold text-red-500">This auction has ended</span>
          {:else}
            Add a Bid to the Auction!
          {/if}
          
        </p>
        <div class="max-h-[50%] overflow-y-scroll bids">
          {#each auctionItem.bids as bid}
          <div class="flex">
            {#if bid.amount == getHighestBid()}
            <span on:click={() => delBid(bid)} class="{bid.ownerUsername == user.username ? 'hover:line-through flex-1 cursor-pointer' : 'flex-1'}"
            ><span class="text-sm font-bold font-underline text-gray-600 rounded-full p-2">€&nbsp; {bid.amount} <span class="text-sm font-normal text-gray-500"> - {bid.ownerUsername}</span></span></span>
            {:else}
            <span on:click={() => delBid(bid)} class="{bid.ownerUsername == user.username ? 'hover:line-through flex-1 cursor-pointer' : 'flex-1'}"><span class="text-sm font-semibold text-gray-600 rounded-full p-2">€&nbsp; {bid.amount} <span class="text-sm font-normal text-gray-500"> - {bid.ownerUsername}</span></span></span>
            {/if}
          </div>
          {/each}
        </div>
        <div class="mt-2">
          <input disabled={moment().diff(auctionItem.age, 'days') > 3} bind:value={bid.amount} placeholder="€" type="number" name="bid" id="bid" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div style="margin-top: 10px;" class="flex justify-end">
          <span 
          on:click={toggleBidModal}
          class="ml-3 my-3 text-blue-700 rounded-full hover:shadow-lg bg-white cursor-pointer border-2 border-blue-700" 
          style="padding: 4px 18px;"
          >Cancel</span>
          <span 
          on:click={placeBid}
          class="ml-3 my-3 text-white rounded-full hover:shadow-lg bg-red-700 cursor-pointer" 
          style="padding: 6px 18px;"
          >Bid</span>
       </div>
      </div>
    </div>
  </svelte:fragment>
</Modal>

<Modal
open={showAuctionModal}
  on:close={() => toggleAuctionModal()}>
  <svelte:fragment slot="body">
    <div class="flex p-8 md:p-0" >
      <div class="">
        <img class="h-full rounded-l-lg" style="width: 39rem;" src={auctionItem.image} alt="">
      </div>
      <div class="pt-2 w-full md:p-4 text-center md:text-left">
        <h3 class="text-xl font-medium text-gray-900">Edit Post</h3>
        <div>
          <label for="title" class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
          <input bind:value={auctionItem.itemName} disabled={!canEdit} placeholder="Title" type="title" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
          <label for="description" class="text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
          <textarea bind:value={auctionItem.description} disabled={!canEdit} placeholder="Description" type="text" name="description" id="description" class="bg-gray-50 h-36 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
        </div>
        <div style="margin-top: 10px;"  class="flex justify-end ">
          {#if canEdit}
          <span 
          on:click={toggleAuctionModal}
          class="ml-3 my-3 text-blue-700 rounded-full hover:shadow-lg bg-white cursor-pointer border-2 border-blue-700" 
          style="padding: 2px 18px;"
          >Cancel</span>
          <span 
          on:click={delAuction}
          class="ml-3 my-3 text-red-700 rounded-full hover:shadow-lg bg-white border-red-700 border-2 cursor-pointer" 
          style="padding: 2px 18px;"
          >Delete</span>
          <span 
          on:click={saveAuction}
          class="ml-3 my-3 text-white rounded-full hover:shadow-lg bg-blue-700 cursor-pointer" 
          style="padding: 2px 18px;"
          >Save</span>
          {/if}
       </div>
      </div>
    </div>
  </svelte:fragment>
</Modal>
