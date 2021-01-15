<script>
	import Login from 'utils/auth/Login.js'
	import { playerStore } from 'stores/playerStore.js'

	let email, password
</script>


<div class='cntr-card'>
	<form>
		<div class='email'>
			<label for='email'>Email</label>
			<input id='email' type='text' bind:value={email} />
		</div>
		<div class='password'>
			<label for='password'>Password</label>
			<input id='password' type='text' bind:value={password} />
		</div>
		<div class='login'>
			<button type='button' on:click={_ => $playerStore = Login($playerStore, email, password)}>
				<a href='/'>Login</a>
			</button>
		</div>
	</form>
</div>


<style>
	button,
	input {
		max-width: 50vw;
	}
	.email,
	.password {
		margin-bottom: var(--std-margin);
	}
</style>