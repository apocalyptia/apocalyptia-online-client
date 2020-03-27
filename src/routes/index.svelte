<script>
import { authUserStore, confirm, logout } from '../stores/netlifyStore'
import { character } from '../stores/characterStore'
import { onMount } from 'svelte'

onMount(() => {
	const hash = window.location.hash.substr(1)
	const result = hash.split(`&`).reduce((result, item) => {
		const parts = item.split(`=`)
		result[parts[0]] = parts[1]
		return result
	}, {})
	if (result.confirmation_token) confirm(result.confirmation_token)
})
</script>


<svelte:head>
	<title>Apocalyptia Online</title>
</svelte:head>
<div class='cntr-card'>
	{#if $authUserStore}
		<p>Logged in as {$authUserStore.displayName || $authUserStore.email}</p>
	{:else}
		<a href='/login' class='link-btn'>
			Login
		</a>
	{/if}
	{#if $character.completed}
		<a href='/sheet' class='link-btn'>
			Character
		</a>
	{:else}
		<a href='/creator' class='link-btn'>
			Character
		</a>
	{/if}
	<a href='/reference' class='link-btn'>
		Rules
	</a>
	<a href='/generator' class='link-btn'>
		Generator
	</a>
</div>


<style>
	.link-btn {
		margin: var(--s100);
	}
</style>