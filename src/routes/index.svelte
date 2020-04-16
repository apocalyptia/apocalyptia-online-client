<script>
import { authUserStore, confirm } from '../stores/netlifyStore'
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
	if (window.localStorage.getItem('character')) {
		$character = JSON.parse(window.localStorage.getItem('character'))
	}
})
</script>


<svelte:head>
	<title>Apocalyptia Online</title>
</svelte:head>
<div class='cntr-card'>
	{#if $authUserStore}
		<p>Logged in as {$authUserStore.displayName || $authUserStore.email}</p>
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
	{:else}
		<a href='/login' class='link-btn'>
			Login
		</a>
		<a href='/signup' class='link-btn'>
			Sign Up
		</a>
	{/if}
</div>