<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import playerStore from '/src/stores/playerStore.js'
	import { goto } from '$app/navigation'

	let email = ``

	let password = ``

	async function playerLogin() {
		await $playerStore.userLogin(email, password)
	}
</script>

<CenterCard>
	<form>
		<div class="email">
			<label for="email">Email</label>
			<input id="email" type="text" required autocomplete="email" bind:value={email} />
		</div>
		<div class="password">
			<label for="password">Password</label>
			<input id="password" type="password" required autocomplete="current-password" bind:value={password} />
		</div>
		<div class="btn-row">
			<button type="submit" class="link-btn" on:click={playerLogin}> Login </button>
		</div>
	</form>
</CenterCard>

<style>
	button,
	input {
		max-width: 50vw;
	}
	form * {
		margin-bottom: var(--margin);
	}
	form *:last-child {
		margin-bottom: 0;
	}
</style>
