<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import playerStore from '/src/stores/playerStore.js'
	import { goto } from '$app/navigation'

	let email = ``

	let password = ``

	let confirm = ``

	let match = false

	function checkPassword() {
		if (password !== confirm) {
			match = false
		} else {
			match = true
		}
	}

	async function playerRegistration() {
		if (match) {
			await $playerStore.authenticateUser.join(email, password).then(() => {
				$playerStore.loggedIn = true
				goto('/')
			})
		} else {
			alert('Error: Passwords do not match!')
		}
	}
</script>

<CenterCard title={'Registration'}>
	<form>
		<div class="email">
			<label for="email">Email</label>
			<input id="email" type="text" required autocomplete="email" bind:value={email} />
		</div>
		<div class="password">
			<label for="password">Password</label>
			<input id="password" type="password" required autocomplete="new-password" bind:value={password} />
		</div>
		<div class="confirm">
			<label for="confirm">Confirm Password</label>
			<input id="confirm" type="password" required autocomplete="current-password" bind:value={confirm} on:keyup={checkPassword} />
		</div>
		<div class="btn-row">
			<button type="submit" class="link-btn" disabled={match === false} on:click={playerRegistration}> Join </button>
		</div>
	</form>
</CenterCard>

<style>
	form * {
		margin-bottom: var(--margin);
	}
	form *:last-child {
		margin-bottom: 0;
	}
</style>
