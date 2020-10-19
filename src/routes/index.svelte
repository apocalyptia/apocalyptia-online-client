<script>
    import { onMount } from 'svelte'
    import { authUserStore, confirm } from 'stores/netlifyStore.js'

    console.log($authUserStore)

    onMount(_ => {
        const hash = window.location.hash.substr(1)
        const result = hash.split(`&`).reduce((result, item) => {
            const parts = item.split(`=`)
            result[parts[0]] = parts[1]
            return result
        }, {})
        if (result.confirmation_token) {
            confirm(result.confirmation_token)
        }
    })
</script>


<div class='cntr-card'>
	{#if $authUserStore}
		<p>Logged in as {$authUserStore.email}</p>
		<a href='/character' class='link-btn'>Character</a>
		<a href='/manual' class='link-btn'>Manual</a>
		<a href='/generator' class='link-btn'>Generator</a>
	{:else}
		<a href='/login' class='link-btn'>Login</a>
		<a href='/signup' class='link-btn'>Sign Up</a>
	{/if}
</div>