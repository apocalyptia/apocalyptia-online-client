<script>
import { character } from '../../../stores/characterStore'
import Description from '../../rules/Descriptions'
</script>


<h1>Description</h1>
<div class='section-card'>
	<div class='player-container'>
		<span>Player:</span>
		<input type='text' bind:value={$character.description.player.value}>
	</div>
</div>
<div class='section-card'>
	<div class='character-container'>
		<span>Character:</span>
		<input type='text'bind:value={$character.description.identity.value}>
		<button on:click={() => $character = Description.list[1].random($character)}>Random</button>
	</div>
</div>


<div class='section-card'>
	{#each Description.list as _, index}
	{#if index % 2 == 0 && index < Description.list.length - 2}
		<div class='pair-block'>
			<div class='item-container'>
				<span>{Description.list[index + 2].name}:</span>
				<input type='text' bind:value={
					$character.description[Description.list[index + 2].name.toLowerCase()].value}>
				<button on:click={
					() => $character = Description.list[index + 2].random($character)
				}>Random</button>
			</div>
			<div class='item-container'>
				<span>{Description.list[index + 3].name}:</span>
				<input type='text' bind:value={
					$character.description[Description.list[index + 3].name.toLowerCase()].value}>
				<button on:click={
					() => $character = Description.list[index + 3].random($character)
				}>Random</button>
			</div>
		</div>
	{/if}
	{/each}
</div>


<div class='button-row'>
	<button class='center-button'
		on:click={() => $character = Description.reset($character)}
	>Reset</button>
	<button class='center-button'
		on:click={() => $character = Description.random($character)}
	>Random</button>
</div>


<style>
.section-card {
	display: block;
}
input[type='text'] {
	margin-left: var(--half-unit);
	margin-right: var(--half-unit);
}
div[class*='-container'] {
	align-items: center;
	display: flex;
	justify-content: center;
	max-width: 100%;
}
div[class*='-container'] span {
	flex: 1;
}
.player-container input[type='text'] {
	flex: 5;
}
.character-container button,
.item-container button {
	flex: 1;
}

/* MOBILE */
@media only screen and (max-width: 768px) {
	.pair-block {
		display: block;
		width: 100%;
	}
	.item-container {
		margin: var(--base-unit) 0;
		width: 100%;
	}
	input[type='text'] {
		flex: 1;
	}
}

/* DESKTOP */
@media only screen and (min-width: 768px) {
	.pair-block {
		display: flex;
		max-width: 100%;
	}
	.item-container {
		margin: var(--half-unit);
		width: 50%;
	}
	input[type='text'] {
		flex: 4;
	}
}

.button-row {
	text-align: center;
}
</style>