<script>
    import { navigate } from 'svelte-routing';

    const goToAuction = () => {
      navigate('/auction', { replace: true });
    };
</script>
<style>
  .button {
    width: 116px;
    padding-top: 10px;
    padding-bottom: 9px;
    text-align: center;
    color: #000;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    margin-top: 15px;
}
.custom-button {
  color: #fff;
  border: 3px solid #c266d3;
  background-image: -webkit-linear-gradient(30deg, #c266d3 50%, transparent 50%);
  background-image: linear-gradient(30deg, #c266d3 50%, transparent 50%);
  background-size: 500px;
  background-repeat: no-repeat;
  background-position: 0%;
  -webkit-transition: background 300ms ease-in-out;
  transition: background 300ms ease-in-out;
}
.custom-button:hover{
  background-position: 100%;
  color: #c266d3;
}
</style>
<main class="h-[100vh] flex items-center px-6 lg:px-32 bg-purple-900 text-white">
    <section class="w-full md:w-9/12 xl:w-8/12">
  <div class="flex justify-between">
    <div class="flex-1"><span class="font-bold uppercase tracking-widest underline underline-offset-2">
      <div>markteten</div></span>
      <h1 class="text-3xl lg:text-5xl font-bold text-pink-500">
        Food<br/>Half Used
      </h1>
      <p class="font-bold mb-1 mt-1">Sick of always throwing away your food?</p>
      <p>Why not give that half eaten burrito someone else and make a profit</p>
      <div class="button custom-button" on:click={goToAuction}>AUCTION</div>
    </div>
      <div class="order-last">
          <img src="src\assets\apple.gif" class="fixed top-64">
      </div>
  </div>
    </section>
  </main>
