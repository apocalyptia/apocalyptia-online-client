<script>
import Spinner from '../../components/views/ui/Spinner.svelte'
import { authUserStore, login } from '../../stores/netlifyStore'

if ($authUserStore) window.location.href = `/`

let email = ``
let password = ``
let pendingApiCall = false
let forgotPassword = false

const submit = (event) => {
	pendingApiCall = true
	login(email, password)
		.catch(e => {
			pendingApiCall = false
			forgotPassword = true
		})
}
</script>


<div class='cntr-card'>
	<form on:submit|preventDefault={submit}>
		<input
			type='email'
			required
			autocomplete='email'
			placeholder='Email'
			bind:value={email}
		/>
		<input
			type='password'
			required
			autocomplete='current-password'
			placeholder='Password'
			bind:value={password}
		/>
		<button>
			{#if pendingApiCall}
				<Spinner/>
			{:else}
				Login
			{/if}
		</button>
		{#if forgotPassword}
			<a href='/login/recover'>
				Forgot your password?
			</a>
		{/if}
	</form>
</div>


<style>
	button, input {
		width: 90%;
	}
	button {
		font-size: var(--s125);
	}
</style>