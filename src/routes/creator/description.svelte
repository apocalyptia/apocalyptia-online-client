<script>
import Description from '../../components/rules/Description'
import NavBar from '../../components/views/controls/NavBar.svelte'
import { authUserStore, signup } from '../../stores/netlifyStore'
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'

let status = `stop`

let next = '/creator/description'

const player = {
	email: ``,
	password: ``,
	confirm: ``
}

const randomItem = (i) => $character = Description.list[i].random($character)

const random = () => $character = Description.random($character)

const reset = () => $character = Description.reset($character)

const submit = () => {
	if (status == `stop`) {
		if (player.password != player.confirm) {
			alert('Password does not match!')
		}
		else {
			alert('Please fill out all fields.')
		}
		return
	}
	status = `wait`
	signup(
		player.email,
		player.password,
	)
	.then(() => status = `go`)
	.catch(e => status = `stop`)
}

beforeUpdate(() => {
	status = `go`
	for (let d of Object.values($character.description)) {
		if (d.value == ``) {
			status = `stop`
			break
		}
	}
	if ($authUserStore == undefined && (!player.email || !player.password || !player.confirm)) {
		status = `stop`
	}
	if (player.password != player.confirm) status = `stop`
	if (status == `go`) next = `/creator/traits`
	else next = `/creator/description`
})
</script>


<h1>Description</h1>
<div class='section-card'>
	{#if $authUserStore == undefined}
		<div class='signup-card'>
			<div class='item-block'>
				<div class='email-container'>
					<span>Email:</span>
					<input type='email'bind:value={player.email}>
				</div>
			</div>
			<div class='item-block'>
				<div class='password-container'>
					<span>Password:</span>
					<input type='password'bind:value={player.password}>
				</div>
			</div>
			<div class='item-block'>
				<div class='password-container'>
					<span>Confirm Password:</span>
					<input type='password'bind:value={player.confirm}>
				</div>
			</div>
		</div>
	{/if}
	<div class='item-block'>
		<div class='character-container'>
			<span>Character:</span>
			<input type='text'bind:value={$character.description.identity.value}>
			<button on:click={() => randomItem(1)}>Random</button>
		</div>
	</div>
	{#each Description.list as _, index}
		{#if index % 2 == 0 && index < Description.list.length - 2}
			<div class='item-block'>
				<div class='item-container'>
					<span>{Description.list[index + 2].name}:</span>
					<input type='text' bind:value={
						$character.description[Description.list[index + 2].name.toLowerCase()].value}>
					<button on:click={() => randomItem(index + 2)}>Random</button>
				</div>
				<div class='item-container'>
					<span>{Description.list[index + 3].name}:</span>
					<input type='text' bind:value={
						$character.description[Description.list[index + 3].name.toLowerCase()].value}>
					<button on:click={() => randomItem(index + 3)}>Random</button>
				</div>
			</div>
		{/if}
	{/each}
</div>
<div class='btn-row'>
	<button class='cntr-btn' on:click={reset}>Reset</button>
	<button class='cntr-btn' on:click={random}>Random</button>
</div>
<NavBar links={{back: '/creator/creation', next: next}} {status} onNext={submit}/>


<style>
.section-card {
	display: block;
}
div[class*='-container'] {
	align-items: center;
	display: flex;
	justify-content: space-evenly;
	max-width: 100%;
}
div[class*='-container'] > span {
	text-align: right;
}
div[class*='-container'] > span,
.character-container > button,
.item-container > button {
	flex: 1;
}
div[class*='-container'] > input {
	margin-left: var(--s33);
	margin-right: var(--s33);
}

/* MOBILE */
@media only screen and (max-width: 900px) {
	.item-block {
		display: block;
		width: 100%;
		max-width: 100%;
	}
	div[class*='-container'] {
		margin: var(--s50) 0;
		width: 100%;
	}
	.character-container > input[type='text'],
	.item-container input[type='text'] {
		flex: 2;
	}
	.signup-card input {
		flex: 3;
	}
}

/* DESKTOP */
@media only screen and (min-width: 900px) {
	.item-block {
		display: flex;
		max-width: 100%;
	}
	div[class*='-container'] {
		margin: var(--s50);
		width: 100%;
	}
	.character-container > input[type='text'] {
		flex: 6
	}
	.item-container > input[type='text'] {
		flex: 2;
	}
	.signup-card input {
		flex: 7;
	}
}
</style>