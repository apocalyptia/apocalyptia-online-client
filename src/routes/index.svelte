<script>
	import Dashboard from '../components/views/ui/Dashboard.svelte'
	import Register from '../components/views/ui/Register.svelte'
	import Signin from '../components/views/ui/Signin.svelte'
	import { authUserStore, confirm, logout } from '../stores/userStore'

	let hash = window.location.hash.substr(1)

	let result = hash.split('&').reduce((result, item) => {
		let parts = item.split('=')
		result[parts[0]] = parts[1]
		return result
	}, {})

	if (result.confirmation_token) confirm(result.confirmation_token)
</script>


<svelte:head>
	<title>Apocalyptia Online</title>
</svelte:head>

{#if $authUserStore}
	<p>Logged in as {$authUserStore.email}</p>
	<button on:click={logout}>Logout</button>
	<Dashboard />
{:else}
	<p>Not logged in</p>
{/if}
{#if !$authUserStore}
	<a href='/register'>Register</a>
	<a href='/signin'>Signin</a>
{/if}