<script>
import { onMount } from 'svelte'
import Dashboard from '../components/views/ui/Dashboard.svelte'
import Landing from '../components/views/ui/Landing.svelte'
import { authUserStore, confirm, logout } from '../stores/netlifyStore'

onMount(() => {
	const hash = window.location.hash.substr(1)
	const result = hash.split('&').reduce((result, item) => {
		const parts = item.split('=')
		result[parts[0]] = parts[1]
		return result
	}, {})
	if (result.confirmation_token) confirm(result.confirmation_token)
})
</script>


<svelte:head>
	<title>Apocalyptia Online</title>
</svelte:head>
{#if $authUserStore}
	<p>Logged in as {$authUserStore.displayName || $authUserStore.email}</p>
	<Dashboard />
{:else}
	<Landing />
{/if}