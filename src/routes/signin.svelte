<script>
	import * as sapper from '@sapper/app'
	import Spinner from "../components/views/ui/Spinner.svelte"
	import { authUserStore } from "../stores/userStore"
	import { signin } from "../stores/userStore"

	if ($authUserStore) sapper.goto('/')

	let password = ""
	let email = ""
	let pendingApiCall = false

	export function submit(event) {
		pendingApiCall = true
		signin(email, password).catch(e => {
			pendingApiCall = false
		})
	}
</script>


<div class='center-card'>
	<div class='title-row'>
		<h3>Login</h3>
	</div>
	<form on:submit|preventDefault={submit} id="main-form">
		<div class='input-section'>
			<input
				id="inline-full-name"
				type="email"
				required
				placeholder="Email"
				bind:value={email} />
			<input
				id="inline-username"
				type="password"
				required
				placeholder="Your password"
				bind:value={password} />
		</div>
		<div class='button-row'>
			<button>Login</button>
			{#if pendingApiCall}
				<Spinner />
			{/if}
		</div>
	</form>
</div>