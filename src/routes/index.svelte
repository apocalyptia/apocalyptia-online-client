<script>
	import { onMount } from 'svelte'
	import Dashboard from './Dashboard.svelte'
	import Register from './Register.svelte'
	import Signin from './Signin.svelte'
	import { authUserStore, confirm, logout } from '../stores/userStore'
	import * as sapper from '@sapper/app'

	onMount(() => {
		let hash = window.location.hash.substr(1)
		let result = hash.split('&').reduce((result, item) => {
			let parts = item.split('=')
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
{:else}
	<p>Not logged in</p>
{/if}
{#if !$authUserStore}
	<button on:click={()=>sapper.goto('/Register')}>Register</button>
	<button on:click={()=>sapper.goto('/Signin')}>Sign In</button>
{:else}
	<Dashboard />
{/if}