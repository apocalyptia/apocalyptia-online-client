<script>
	import Description from '../../../rules/description/Description'
	import NavBar from '../../../views/widgets/NavBar.svelte'
	import RandomCharacter from '../../../helpers/random/RandomCharacter'
	import { beforeUpdate } from 'svelte'
	import { character } from '../../../stores/characterStore'
	import { goto } from '@roxi/routify'

	let status = `stop`

	let next

	const randomItem = (i) => $character = Description.list[i].random($character)

	const random = () => $character = Description.random($character)

	const reset = () => $character = Description.reset($character)

	const randomCharacter = () => {
		$character = RandomCharacter($character)
		$goto('/character/creator/sheet')
	}

	beforeUpdate(() => {
		status = `go`
		for (let d of Object.values($character.desc)) {
			if (d.value == ``) {
				status = `stop`
				break
			}
		}
		if (status == `go`) next = `/character/creator/traits`
		else next = `/character/creator/description`
	})
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Description</title>
</svelte:head>
<h1>Description</h1>
<div class='section-card'>
	<div class='item-block'>
		<div class='character-container'>
			<span>Character:</span>
			<input type='text' bind:value={$character.desc.identity.value}>
			<button on:click={() => randomItem(1)}>Random</button>
		</div>
	</div>
	{#each Description.list as _, index}
		{#if index % 2 == 0 && index < Description.list.length - 2}
			<div class='item-block'>
				<div class='item-container'>
					<span>{Description.list[index + 2].name}:</span>
					<input type='text' bind:value={
						$character.desc[Description.list[index + 2].name.toLowerCase()].value}>
					<button on:click={() => randomItem(index + 2)}>Random</button>
				</div>
				<div class='item-container'>
					<span>{Description.list[index + 3].name}:</span>
					<input type='text' bind:value={
						$character.desc[Description.list[index + 3].name.toLowerCase()].value}>
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
<br>
<div class='btn-row'>
	<button class='cntr-btn' on:click={randomCharacter}>Random Character</button>
</div>
<NavBar links={{back: '/', next: next}} {status}/>


<style>
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
	}
</style>