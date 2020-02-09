<script>
	import { register, authUserStore, PENDING_VERIFICATION } from '../../../stores/userStore'

	let password, email = ''
	let pending = false

	export function registerHandler(email, password) {
		register(email, password).then(() => pending = true).catch(e => alert(e.message))
	}
</script>


<br>
<h1>Sign Up</h1>
<br>
<form>
<input placeholder='email' bind:value={email}>
<br>
<br>
<input placeholder='password' type='password' bind:value={password}>
<br>
<br>
<button on:click={() => registerHandler(email, password)}>Register</button>
</form>

{#if pending}
	<h2>Please check your email to verify and then login</h2>
{/if}