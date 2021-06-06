<!-- <script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import join from '/src/utils/auth/join.js'
	import playerStore from '/src/stores/playerStore.js'

	let email = ``,
		password = ``,
		confirm = ``
</script>

<CenterCard>
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
</CenterCard>

<style>
	form * {
		margin-bottom: var(--std-margin);
	}
	form *:last-child {
		margin-bottom: 0;
	}
</style> -->
