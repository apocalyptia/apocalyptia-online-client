<script>
    import { onMount } from 'svelte'
    import { url } from '@roxi/routify'
    import { authUserStore, confirm } from '../stores/netlifyStore'
    import { character } from '../stores/characterStore'

    onMount(() => {
        const hash = window.location.hash.substr(1)
        const result = hash.split(`&`).reduce((result, item) => {
            const parts = item.split(`=`)
            result[parts[0]] = parts[1]
            return result
        }, {})
        if (result.confirmation_token) {
            confirm(result.confirmation_token)
        }
        if (window.localStorage.getItem('character')) {
            $character = JSON.parse(window.localStorage.getItem('character'))
        }
    })
</script>


<div class='cntr-card'>
	{#if $authUserStore}
		<p>Logged in as {$authUserStore.displayName || $authUserStore.email}</p>
		{#if window.localStorage.getItem('character')}
			<a href={$url('/sheet')} class='link-btn'>Character</a>
		{:else}
			<a href={$url('/creator')} class='link-btn'>Character</a>
		{/if}
		<a href={$url('/reference')} class='link-btn'>Rules</a>
		<a href={$url('/generator')} class='link-btn'>Generator</a>
	{:else}
		<a href={$url('/login')} class='link-btn'>Login</a>
		<a href={$url('/signup')} class='link-btn'>Sign Up</a>
	{/if}
</div>