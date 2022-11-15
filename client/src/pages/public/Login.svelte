<script>
  import UserApi from "../../api/auth";
  import { navigate } from 'svelte-routing';
  import { token } from '../../lib/store/token';

  let user = {
    username: "",
    password: ""
  }

  let messages = "";

  const login = () => {
    if($token) {
      messages = "Already logged in."
      return;
    }
    UserApi.login(user).then((res) => {
      messages = "";
      if(!res.token) return;
       // @ts-ignore
      localStorage.setItem('token', res.token);
      token.set(localStorage.getItem('token'));
      navigate('/landing', { replace: true });
    }).catch((err) => {
      messages = "An error has occured!";
    });
  };
</script>
<style>
  .custom-warning {
    background-color: #f4dedf;
    border: 2px solid #e9d1d3;
    color: #b23f44;
  }
</style>
<form on:submit|preventDefault={login}>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
    <div class="w-full max-w-md space-y-8">
      <div>
        <a href="/landing"><img class="mx-auto h-12 w-auto" src="src\assets\apple.gif" alt="Markteten"></a>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Register here</a>
        </p>
        {#if messages.length > 0}
        <div class="p-2 custom-warning rounded mt-2"> {messages} </div>
        {/if}
      </div>
        <input type="hidden" name="remember" value="true">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="user-name" class="sr-only">Username</label>
            <input bind:value={user.username} id="user-name" name="username"  autocomplete="username" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input bind:value={user.password} id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
          </div>
        </div>
  
        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </div>
  
        <div>
          <button on:click={login} class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <!-- Heroicon name: mini/lock-closed -->
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
    </div>
  </div>
</form>
