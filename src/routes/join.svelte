<script>
	import Login from 'utils/auth/Login.js'
	import playerStore from 'stores/playerStore.js'

	let username, email, password, confirm
</script>


<div class='cntr-card'>
	<form>
		<div class='username'>
			<label for='username'>Username</label>
			<input id='username' type='text' required bind:value={username} />
		</div>
		<div class='email'>
			<label for='email'>Email</label>
			<input id='email' type='text' required bind:value={email} />
		</div>
		<div class='password'>
			<label for='password'>Password</label>
			<input id='password' type='text' required bind:value={password} />
		</div>
		<div class='confirm'>
			<label for='confirm'>Confirm Password</label>
			<input id='confirm' type='text' required bind:value={confirm} />
		</div>
		<div class='join'>
			<button type='button' on:click={_ => $playerStore = Login($playerStore, email, password)}>
				<a href='/'>Join</a>
			</button>
		</div>
	</form>
</div>


<style>
	.username,
	.email,
	.password,
	.confirm {
		margin-bottom: var(--std-margin);
	}
</style>