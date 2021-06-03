<!-- <script>
	import join from '/src/utils/auth/join.js'
	import playerStore from '/src/stores/playerStore.js'

	let email = ``,
		password = ``,
		confirm = ``
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
		<div class='confirm'>
			<label for='confirm'>Confirm Password</label>
			<input id='confirm' type='password' required bind:value={confirm} />
		</div>
		<div class='join'>
			<a href='/'>
				<button type='submit' on:click={() => ($playerStore = join($playerStore, email, password, confirm))}>
					Join
				</button>
			</a>
		</div>
	</form>
</div>

<style>
	.email,
	.password,
	.confirm {
		margin-bottom: var(--std-margin);
	}
</style> -->
