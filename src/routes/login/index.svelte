<script>
import * as sapper from '@sapper/app'
import Spinner from '../../components/views/ui/Spinner.svelte'
import { authUserStore } from '../../stores/userStore'
import { login } from '../../stores/userStore'

if ($authUserStore) sapper.goto(`/`)

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


<div class='center-card'>
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
				<Spinner />
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