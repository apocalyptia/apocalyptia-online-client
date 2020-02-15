<script>
	import { onMount } from 'svelte'
	import Dashboard from './dashboard.svelte'
	import Register from './register.svelte'
	import Signin from './signin.svelte'
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
	<Dashboard />
{:else}
	<div class='center-card'>
		<div class='title-row'>
			Connection established...
		</div>
		<div class='button-row'>
			<button on:click={()=>sapper.goto('/register')}>
				Signup
			</button>
			<button on:click={()=>sapper.goto('/signin')}>
				Login
			</button>
		</div>
	</div>
{/if}


<style>
	.button-row {
		justify-content: space-between !important;
	}
</style>