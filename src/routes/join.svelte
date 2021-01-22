<script>
	import Login from '$utils/auth/Login.js'
	import playerStore from '$stores/playerStore.js'

	let name, email, password, confirm
</script>


<div class='cntr-card'>
	<form>
		<div class='name'>
			<label for='name'>Name</label>
			<input id='name' type='text' bind:value={name} />
		</div>
		<div class='email'>
			<label for='email'>Email</label>
			<input id='email' type='text' bind:value={email} />
		</div>
		<div class='password'>
			<label for='password'>Password</label>
			<input id='password' type='text' bind:value={password} />
		</div>
		<div class='confirm'>
			<label for='confirm'>Confirm Password</label>
			<input id='confirm' type='text' bind:value={confirm} />
		</div>
		<div class='join'>
			<button type='button' on:click={_ => $playerStore = Login($playerStore, email, password)}>
				<a href='/'>Join</a>
			</button>
		</div>
	</form>
</div>


<style>
	.name,
	.email,
	.password,
	.confirm {
		margin-bottom: var(--std-margin);
	}
</style>