<script>
import Spinner from '../../components/views/ui/Spinner.svelte'
import { authUserStore, login, signup } from '../../stores/netlifyStore'


if ($authUserStore) window.location.href = `/`

let message = ``

const user = {
	email: ``,
	password: ``,
	confirm: ``
}

let pendingApiCall = false

const submit = () => {
	if (user.password != user.confirm) {
		alert('Password does not match!')
		return
	}
	pendingApiCall = true
	signup(user)
		.then(() => message = `Confirmation email sent. Please confirm your account.`)
		.catch(e => {
			pendingApiCall = false
			alert(e)
		})
}

const proceed = () => window.location.href = `/login`
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
			/>
			<input
				type='password'
				required
				placeholder='Confirm Password'
				bind:value={user.confirm}
			/>
			{#if !message}
				<input
					type='submit'
					class='link-btn'
					value='Creat Account'
				>
			{:else}
				<h3>{message}</h3>
				<a href='/login' class='link-btn'>Proceed To Login</a>
			{/if}
		</form>
	{/if}
</div>