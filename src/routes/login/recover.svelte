<script>
	import Spinner from 'views/widgets/Spinner.svelte'
	// import { userStore, recover } from 'stores/userStore.js'
	import { goto } from '@sapper/app'

	// if (userStore) goto(`/`)

	let email = ``

	let showSuccessMessage = false

	let pendingApiCall = false

	const submit = _ => {
		// pendingApiCall = true
		// recover(email)
		// 	.then(_ => {
		// 		showSuccessMessage = true
		// 		pendingApiCall = false
		// 	})
		// 	.catch(_ => {
		// 		pendingApiCall = false
		// 	})
	}
</script>


<div class='cntr-card'>
	<div class='card-title'>
		Request Account Recovery
	</div>
	{#if pendingApiCall}
		<Spinner />
	{:else}
		<form on:submit|preventDefault={submit}>
			<input
				type='email'
				required
				autocomplete='email'
				placeholder='Email'
				bind:value={email}
			/>
			<input
				type='submit'
				class='link-btn'
				value='Recover'
			>
		</form>
	{/if}
	{#if showSuccessMessage}
		<p>An email has been sent if that account exists to allow you to log in one time. You will need to set your password immediately in order to log in again.</p>
	{/if}
</div>