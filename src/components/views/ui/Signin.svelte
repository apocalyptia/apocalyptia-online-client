<script>
	import * as sapper from '@sapper/app'
	import { signin, authUserStore, PENDING_VERIFICATION } from '../../../stores/userStore'

	let password, email = ''

	export function signinHandler(email, password) {
		signin(email, password)
		.then(() => sapper.goto('/reference'))
		.then(() => console.log('SUCCESS!!!'))
		.catch(e => alert(e.message))
	}
</script>


<br>
<h1>Sign In</h1>
<br>
<form>
<input placeholder='email' autocomplete bind:value={email}>
<br>
<br>
<input placeholder='password' autocomplete type='password' bind:value={password}>
<br>
<br>
<button on:click={() => signinHandler(email, password)}>Login</button>
</form>