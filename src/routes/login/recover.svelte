<script>
import Spinner from '../../components/views/ui/Spinner.svelte'
import { authUserStore, recover } from '../../stores/netlifyStore'

if ($authUserStore) window.location.href = `/`

let email = ``
let showSuccessMessage = false
let pendingApiCall = false

const submit = (event) => {
	pendingApiCall = true
	recover(email)
		.then(newUser => {
			showSuccessMessage = true
			pendingApiCall = false
		})
		.catch(e => {
			pendingApiCall = false
		})
}
</script>


<div class='cntr-card'>
	<div class='card-title'>
		Request Account Recovery
	</div>
	<form on:submit|preventDefault={submit}>
		<input
			type='email'
			required
			autocomplete='email'
			placeholder='Email'
			bind:value={email}
		/>
		<button>
			{#if pendingApiCall}
				<Spinner/>
			{:else}
				Recover
			{/if}
		</button>
	</form>
	{#if showSuccessMessage}
		<p>
			An email has been sent if that account exists to allow you to log in one time. You will
			need to set your password immediately in order to log in again.
		</p>
	{/if}
</div>