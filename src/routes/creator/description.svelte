<script>
import { character } from '../../stores/characterStore'
import Description from '../../components/rules/Description'
import NavBar from '../../components/views/controls/NavBar.svelte'

const randomItem = (i) => $character = Description.list[i].random($character)

const random = () => $character = Description.random($character)

const reset = () => $character = Description.reset($character)
</script>


<h1>Description</h1>
<div class='section-card'>
	<div class='item-block'>
		<div class='player-container'>
			<span>Player:</span>
			<input type='text'bind:value={$character.description.player.value}>
		</div>
	</div>
	<div class='item-block'>
		<div class='character-container'>
			<span>Identity:</span>
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
<div class='button-row'>
	<button class='center-button' on:click={reset}>Reset</button>
	<button class='center-button' on:click={random}>Random</button>
</div>
<NavBar links={{back: '/creator/creation', next: '/creator/traits'}}/>


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
.player-container > input[type='text'] {
	margin-left: var(--s33);
	margin-right: 0;
	padding-left: var(--s50);
	padding-right: var(--s50);
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
	.player-container > input[type='text'] {
		flex: 3;
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
	.player-container > input[type='text'] {
		flex: 7;
	}
	.character-container > input[type='text'] {
		flex: 6
	}
	.item-container > input[type='text'] {
		flex: 2;
	}
}
</style>