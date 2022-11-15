<script>
// @ts-nocheck
  import { onMount, tick } from "svelte";
  import AuctionApi from "../../api/auction";
  import { isEmpty } from 'lodash-es';
  import Spinner from '../../components/Spinner.svelte';
  import { token } from '../../lib/store/token';
  import { Base64 } from 'js-base64';

  //Components
  import AuctionItem from "../../components/AuctionItem.svelte";
  import Modal from '../../components/modal/Modal.svelte'
  import SmallModal from '../../components/modal/SmallModal.svelte'
  import { navigate } from "svelte-routing";

  //TODO: create case for when no data is loaded within the program.

  let auctionItems = [];
  let user = {};
  let searchTitle = "";
  let auctionToCreate = {};
  let under100 = false, wins= false, oneday= false;
  let creatingAuction = false;


  const loadAuctions = async () => {
    auctionItems = [];
    await tick();
    AuctionApi.getAuctions(searchTitle, under100, wins, oneday).then((res) => {
      auctionItems = res;
    });
  };

  const createAuction = async () => {
    creatingAuction = true;
    auctionToCreate.owner = user.username;
    await AuctionApi.createAuction(auctionToCreate).then((res) => {
      loadAuctions();
      showCreateAuctionModal = false;
      auctionToCreate = {};
      creatingAuction = false;
    });
  };

  const deleteAuctionItem = async (event) => {
    //Not a massive fan of this either, but the DOM not updating has forced my hand
    auctionItems = auctionItems.filter(a => a.id != event.detail.aucId);
    await tick();
  }

  const logout = () => {
      localStorage.clear();
      token.set(localStorage.getItem('token'));
      navigate('/login', { replace: true });
  };

  onMount(async () => {
    loadAuctions();
    let arr = $token.split('.');
    let result = JSON.parse(Base64.decode(arr[1]));
    user = result.user;
  });

  let showCreateAuctionModal = false
  const toggleCreateAuctionModal = () => {
    showCreateAuctionModal = !showCreateAuctionModal
  };

  let showFilterModal = false;
  const toggleFilterModal = () => {
    showFilterModal = !showFilterModal
  };
</script>
<style>
  .search-input {
    position: relative;
    width: 100%;
    max-width: 240px;
  }
  .search-input input {
    outline: none;
    width: 100%;
    font-size: 16px;
    border: 0;
    line-height: 24px;
    padding: 8px 36px 8px 14px;
    box-shadow: 0 4px 12px -2px rgba(107, 117, 161, 0.16);
    color: #797C86;
  }
  .search-input input {
    color: #C7C8CC;
  }
  .add-button {
    color: #C7C8CC;
    box-shadow: 0 4px 12px -2px rgba(107, 117, 161, 0.16);
    padding: 8px 13px 8px 13px;
  }
</style>
  <div class="px-80 h-[100vh]">
    <div class="header">
      <div class="my-5 flex flex-row justify-between bg-white font-bold p-4 ambient-background">
        <div class="text-2xl ambient-text">Markteten</div>
        <div class="flex flex-col">
          <div class="text-2xl ambient-text">
            Welcome {user.username}
          </div>
          <div class="text-sm font-bold text-gray-500 hover:underline cursor-pointer" on:click={logout}>
            logout
          </div>
        </div>
        
      </div>
    </div>
    <div class="main-container">
      <div class="flex flex-row">
        <div class="search-input pl-4">
            <input bind:value={searchTitle} class="rounded-lg" type="text" placeholder="Search"/>
        </div>
        <div class="add-button ml-2 px-5 rounded-lg bg-white hover:bg-slate-100 cursor-pointer" on:click={() => loadAuctions()}>
            <span class="font-bold">
              <i class="fa-solid fa-search"></i>
            </span>
        </div>
        <div class="add-button ml-2 px-5 rounded-lg bg-white hover:bg-slate-100 cursor-pointer" on:click={() => toggleCreateAuctionModal()}>
            <span class="font-bold">
              <i class="fa-solid fa-plus"></i>
            </span>
        </div>
        <div class="add-button ml-2 px-5 rounded-lg bg-white hover:bg-slate-100 cursor-pointer" on:click={() => toggleFilterModal()}>
          <span class="font-bold">
            <i class="fa-solid fa-filter"></i>
          </span>
      </div>
      </div>
      <div class="auctions-container flex flex-row flex-wrap">
        {#if !isEmpty(auctionItems)}
          {#each auctionItems as item}
              <AuctionItem bind:auctionItem={item} bind:user={user} on:refresh={loadAuctions} on:delete={deleteAuctionItem}/>
            {/each}
        {:else}
          <Spinner />
        {/if}
      </div>
    </div>
  </div>
<Modal
  open={showCreateAuctionModal}
  on:close={() => toggleCreateAuctionModal()}
  >
  <svelte:fragment slot="body">
    {#if !creatingAuction}
    <div class="flex p-8 md:p-0">
      <div class="">
        <img class="h-auto rounded-l-lg" style="width: 46rem;" src="src\assets\food.png" alt="">
      </div>
      <div class="pt-2 w-full md:p-4 text-center md:text-left">
        <h3 class="mb-2 text-xl font-medium text-gray-900">Add Auction</h3>
        <p class="text-sm font-normal text-gray-500">
          Create a post for people to bid on! Dont worry about your image, we'll make one for you!
        </p>
        <div>
          <label for="title" class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
          <input bind:value={auctionToCreate.itemName} placeholder="Title" type="title" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
          <label for="description" class="text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
          <textarea bind:value={auctionToCreate.description} placeholder="Description" type="text" name="description" id="description" class="bg-gray-50 h-36 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
        </div>
        <div class="flex justify-end">
          <span on:click={createAuction} class="ml-3 mt-3 text-white bg-blue-700 rounded-full hover:shadow-lg cursor-pointer" style="padding: 2px 18px;">Save</span>
       </div>
      </div>
    </div>
    {:else}
    <div class="flex p-20 min-h-[390px]">
      <div class="">
        <img class="h-auto rounded-l-lg" style="width: 22rem;" src="src\assets\apple.gif" alt="">
      </div>
      <div style="padding-left: 88px;" class="pt-16 w-full text-center md:text-left">
        <h1 class="mb-2 text-xl font-medium text-gray-900">Creating Post</h1>
        <p class="text-sm font-normal text-gray-500">
          Currently generating a custom image for your post with OpenAi!
        </p>
      </div>
    </div>
    {/if}
  </svelte:fragment>
</Modal>
<SmallModal
  open={showFilterModal}
  on:close={() => toggleFilterModal()}
  >
  <svelte:fragment slot="body">
    <div class="py-8 px-10">
      <ul class="my-4 space-y-3">
        <li>
            <div class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
              <input type="checkbox" bind:checked={wins} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="flex-1 ml-3 whitespace-nowrap">My Wins</span>
            </div>
        </li>
        <li>
            <div class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
              <input type="checkbox" bind:checked={oneday} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="flex-1 ml-3 whitespace-nowrap">Less 1 Day</span>
            </div>
        </li>
        <li>
            <div class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
              <input type="checkbox" bind:checked={under100} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"><span class="flex-1 ml-3 whitespace-nowrap">Bids Under € 100</span>
            </div>
        </li>
      </ul>
      <div class="flex justify-end">
        <span 
        on:click={toggleFilterModal}
        class="ml-3 my-2 text-blue-700 rounded-full hover:shadow-lg bg-white cursor-pointer border-2 border-blue-700" 
        style="padding: 2px 18px;"
        >Cancel</span>
        <span 
        on:click={loadAuctions}
        class="ml-3 my-2 text-white rounded-full hover:shadow-lg bg-red-700 cursor-pointer" 
        style="padding: 2px 18px;"
        >Apply</span>
     </div>
      </div>
  </svelte:fragment>
</SmallModal>

