<script>
    import { Route } from 'svelte-routing';
    import accessDenied from '../private/AccessDenied.svelte';
    import { token } from '../../lib/store/token';

    export let path;
    export let component;

    $: isAuthenticated = $token
    
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />
{:else}
    <Route path={path} component={accessDenied} />
{/if}