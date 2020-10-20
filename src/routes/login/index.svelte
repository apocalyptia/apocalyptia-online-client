<script>
	import Spinner from 'views/widgets/Spinner.svelte'
	import { userId, login } from 'stores/netlifyStore.js'

	if (userId) window.location.assign(`www.apocalyptiaonline.com`)

	const user = {
		email: ``,
		password: ``
	}

	let pendingApiCall = false
	
	let forgotPassword = false

	const submit = () => {
		pendingApiCall = true
		login(user)
			.catch(_ => {
				pendingApiCall = false
				forgotPassword = true
			})
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Login</title>
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
				autocomplete='current-password'
				placeholder='Password'
				bind:value={user.password}
			/>
			<input
				type='submit'
				class='link-btn'
				value='Login'
			>
			{#if forgotPassword}
				<a href='/login/recover'>Forgot your password?</a>
			{/if}
		</form>
	{/if}
</div>