<script>
	import RandomAge from 'random/RandomAge.js'
	import RandomDescription from 'random/RandomDescription.js'
	import RandomHair from 'random/RandomHair.js'
	import RandomHeight from 'random/RandomHeight.js'
	import RandomName from 'random/RandomName.js'
	import RandomSex from 'random/RandomSex.js'
	import RandomSkin from 'random/RandomSkin.js'
	import RandomWeight from 'random/RandomWeight.js'
	import { character } from 'stores/characterStore.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Description</title>
</svelte:head>
<div class='creator-page'>
	<h1>Description</h1>
	<div class='section-card'>
		<div class='item-block'>
			<div class='character-container'>
				<span>Name:</span>
				<input type='text' bind:value={$character.description.name.value}>
				<button on:click={() => $character.description.name.value = RandomName($character)}>Random</button>
			</div>
		</div>
		<div class='item-block'>
			<div class='item-container'>
				<span>Age:</span>
				<input type='text' bind:value={$character.description.age.value}>
				<button on:click={() => $character.description.age.value = RandomAge()}>Random</button>
			</div>
			<div class='item-container'>
				<span>Sex:</span>
				<input type='text' bind:value={$character.description.sex.value}>
				<button on:click={() => $character.description.sex.value = RandomSex()}>Random</button>
			</div>
		</div>
		<div class='item-block'>
			<div class='item-container'>
				<span>Height:</span>
				<input type='text' bind:value={$character.description.height.value}>
				<button on:click={() => $character.description.height.value = RandomHeight($character)}>Random</button>
			</div>
			<div class='item-container'>
				<span>Weight:</span>
				<input type='text' bind:value={$character.description.weight.value}>
				<button on:click={() => $character.description.weight.value = RandomWeight($character)}>Random</button>
			</div>
		</div>
		<div class='item-block'>
			<div class='item-container'>
				<span>Skin:</span>
				<input type='text' bind:value={$character.description.skin.value}>
				<button on:click={() => $character.description.skin.value = RandomSkin()}>Random</button>
			</div>
			<div class='item-container'>
				<span>Hair:</span>
				<input type='text' bind:value={$character.description.hair.value}>
				<button on:click={() => $character.description.hair.value = RandomHair($character)}>Random</button>
			</div>
		</div>
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={() => $character = $character.resetDescription()}>Reset</button>
		<button class='small-cntr-btn' on:click={() => $character = RandomDescription($character)}>Random</button>
	</div>
</div>


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