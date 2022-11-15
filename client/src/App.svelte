<script>
  // @ts-ignore
  import { Router, Route } from "svelte-routing";
  import ProtectedRoute from './pages/public/ProtectedRoute.svelte';
  import Login from './pages/public/Login.svelte';
  import Register from './pages/public/Register.svelte';
  import Landing from './pages/public/Landing.svelte';
  import Auction from './pages/private/Auction.svelte';
  import { token } from "./lib/store/token";

</script>


<Router>
  <Route path="/" component={token == null ? Login : Landing} />
  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
  <Route path="/landing" component={Landing} />
  <ProtectedRoute path="/auction" component={Auction} />
  <Route path="/profile/:username" let:params>
    <Landing params={params}/>
  </Route>
</Router>
