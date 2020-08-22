<script>
	import { goto, url } from '@sveltech/routify'
	import Spinner from '../../components/views/ui/Spinner.svelte'
	import { authUserStore, login, signup } from '../../stores/netlifyStore'

	if ($authUserStore) $goto(`/`)

	let confirmMessage = ``

	const user = {
		email: ``,
		password: ``,
		confirm: ``
	}

	let pendingApiCall = false

	let failedMatch = ``

	const checkMatch = () => {
		if (
			(user.password && user.confirm) &&
			(user.password != user.confirm) 
		) failedMatch = 'Password does not match!'
	}

	const submit = () => {
		if (user.email && (user.password == user.confirm)) {
			pendingApiCall = true
			signup(user)
				.then(() => confirmMessage = `Confirmation email sent. Please confirm your account.`)
				.catch(e => {
					pendingApiCall = false
					alert(e)
				})
		}
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Signup</title>
</svelte:head>
<div class='cntr-card'>
	{#if pendingApiCall}
		<Spinner />
	{:else}
		<form on:submit|preventDefault={submit}>
			<input
				type='email'
				required
				autocomplete='email'
				placeholder='Email'
				bind:value={user.email}
			/>
			<input
				type='password'
				required
				placeholder='Password'
				bind:value={user.password}
				on:blur={checkMatch}
			/>
			<input
				type='password'
				required
				placeholder='Confirm Password'
				bind:value={user.confirm}
				on:blur={checkMatch}
			/>
			{#if failedMatch}
				<div class='error'>{failedMatch}</div>
			{/if}
			{#if !confirmMessage}
				<input
					type='submit'
					class='link-btn'
					value='Creat Account'
					disabled={failedMatch}
				>
			{:else}
				<h3>{confirmMessage}</h3>
				<a href={$url('/login')} class='link-btn'>Proceed To Login</a>
			{/if}
		</form>
	{/if}
</div>