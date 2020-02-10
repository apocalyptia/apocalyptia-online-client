<script>
	import * as sapper from '@sapper/app'
	import Spinner from "../components/views/ui/Spinner.svelte"
	import { authUserStore } from "../stores/userStore"
	import { register } from "../stores/userStore"

	if ($authUserStore) sapper.goto('/')

	let password = ""
	let email = ""
	let displayName = ""
	let username = ""

	let showSuccessMessage = false
	let pendingApiCall = false

	export function submit(event) {
		pendingApiCall = true
		register(email, password,username, displayName)
			.then(newUser => {
				showSuccessMessage = true
				pendingApiCall = false
			})
			.catch(e => {
				pendingApiCall = false
			})
	}
</script>

<div class='center-card'>
	<div class='title-row'>
		<h3>Account Settings</h3>
	</div>
	<form on:submit|preventDefault={submit}>
		<div class='input-section'>
			<input type="email" required placeholder="Email" bind:value={email} />
			<input type="password" required placeholder="Your password" bind:value={password} />
			<input required placeholder="Username" bind:value={username} />
			<input required placeholder="Display Name" bind:value={displayName} />
		</div>
		<div class='button-row'>
			<button>Signup</button>
			{#if pendingApiCall}
				<Spinner />
			{/if}
		</div>
	</form>
	{#if showSuccessMessage}
		<p>Please check your email to verify and then login</p>
	{/if}
</div>