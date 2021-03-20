<script>
	import BackButton from '/src/components/buttons/BackButton.svelte'
	import Login from '/src/utils/auth/Login.js'
	import playerStore from '/src/stores/playerStore.js'

	let email = ``, password = ``
</script>


<div class='cntr-card'>
	<form>
		<div class='email'>
			<label for='email'>Email</label>
			<input id='email' type='text' required bind:value={email} />
		</div>
		<div class='password'>
			<label for='password'>Password</label>
			<input id='password' type='password' required bind:value={password} />
		</div>
		<div class='login'>
			<a href='/'>
				<button type='submit' on:click={_ => $playerStore = Login($playerStore, email, password)}>
					Login
				</button>
			</a>
		</div>
	</form>
</div>
<BackButton path={'/'} />


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