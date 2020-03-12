<script>
	import Spinner from '../../components/views/ui/Spinner.svelte'
	import { authUserStore, signup } from '../../stores/netlifyStore'

	if ($authUserStore) window.location.href = `/`

	let email = ``
	let password = ``
	let displayName = ``
	let username = ``

	let showSuccessMessage = false
	let pendingApiCall = false

	const submit = (event) => {
		pendingApiCall = true
		signup(email, password, username, displayName)
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
	<form on:submit|preventDefault={submit}>
		<input
			type='email'
			required
			placeholder='Email'
			bind:value={email}
		/>
		<input
			type='password'
			required
			placeholder='Password'
			bind:value={password}
		/>
		<input
			type='text'
			required
			placeholder='Username'
			bind:value={username}
		/>
		<input
			required
			placeholder='Display Name'
			bind:value={displayName}
		/>
		<button>
			{#if pendingApiCall}
				<Spinner/>
			{:else}
				Signup
			{/if}
		</button>
	</form>
	{#if showSuccessMessage}
		<p>Check your email for verification.</p>
	{/if}
</div>