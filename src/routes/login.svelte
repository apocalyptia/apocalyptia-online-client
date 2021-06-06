<!-- <script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import login from '/src/utils/auth/login.js'
	import playerStore from '/src/stores/playerStore.js'

	let email = ``

	let password = ``
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
		<div class='login'>
			<a href='/'>
				<button type='submit' on:click={() => ($playerStore = login($playerStore, email, password))}> Login </button>
			</a>
		</div>
	</form>
</CenterCard>

<style>
	button,
	input {
		max-width: 50vw;
	}
	form * {
		margin-bottom: var(--std-margin);
	}
	form *:last-child {
		margin-bottom: 0;
	}
</style> -->
