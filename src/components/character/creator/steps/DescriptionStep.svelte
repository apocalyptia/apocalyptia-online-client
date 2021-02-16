<script>
	import Creation from 'rules/Creation.js'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import RandomAge from 'rules/random/RandomAge.js'
	import RandomDescription from 'rules/random/RandomDescription.js'
	import RandomHair from 'rules/random/RandomHair.js'
	import RandomHeight from 'rules/random/RandomHeight.js'
	import RandomName from 'rules/random/RandomName.js'
	import RandomSex from 'rules/random/RandomSex.js'
	import RandomSkin from 'rules/random/RandomSkin.js'
	import RandomWeight from 'rules/random/RandomWeight.js'
	import ResetAndRandomButtonRow from 'components/character/creator/ResetAndRandomButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'

	const randomName = _ => {
		$characterStore.description.name.value = RandomName($characterStore)
		SaveCharacter()
	}

	const randomAge = _ => {
		$characterStore.description.age.value = RandomAge()
		SaveCharacter()
	}

	const randomSex = _ => {
		$characterStore.description.sex.value = RandomSex()
		SaveCharacter()
	}

	const randomHeight = _ => {
		$characterStore.description.height.value = RandomHeight($characterStore)
		SaveCharacter()
	}

	const randomWeight = _ => {
		$characterStore.description.weight.value = RandomWeight($characterStore)
		SaveCharacter()
	}

	const randomSkin = _ => {
		$characterStore.description.skin.value = RandomSkin()
		SaveCharacter()
	}

	const randomHair = _ => {
		$characterStore.description.hair.value = RandomHair($characterStore)
		SaveCharacter()
	}

	const characterReset = _ => {
		$characterStore = Creation.resetDescription($characterStore)
		SaveCharacter()
	}

	const randomDescription = _ => {
		$characterStore = RandomDescription($characterStore)
		SaveCharacter()
	}
</script>


<div class='description-step-page'>
	<PageHeader chapter={'Description'} step={$characterStore.meta.step} />
	<div class='section-card'>
		<div class='block-row'>
			<div class='character-container'>
				<span>Name:</span>
				<input type='text'
					bind:value={$characterStore.description.name.value}
					on:change={SaveCharacter}
				>
				<button on:click={randomName}>Random</button>
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Age:</span>
				<input type='text'
					bind:value={$characterStore.description.age.value}
					on:change={SaveCharacter}
				>
				<button on:click={randomAge}>Random</button>
			</div>
			<div class='item-container'>
				<span>Sex:</span>
				<input type='text'
					bind:value={$characterStore.description.sex.value}
					on:change={SaveCharacter}
				>
				<button on:click={randomSex}>Random</button>
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Height:</span>
				<input type='text'
					bind:value={$characterStore.description.height.value}
					on:change={SaveCharacter}
				>
				<button on:click={randomHeight}>Random</button>
			</div>
			<div class='item-container'>
				<span>Weight:</span>
				<input type='text'
					bind:value={$characterStore.description.weight.value}
					on:change={SaveCharacter}
				>
				<button on:click={randomWeight}>Random</button>
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Skin:</span>
				<input type='text'
					bind:value={$characterStore.description.skin.value}
					on:change={SaveCharacter}
				>
				<button on:click={randomSkin}>Random</button>
			</div>
			<div class='item-container'>
				<span>Hair:</span>
				<input type='text'
					bind:value={$characterStore.description.hair.value}
					on:change={SaveCharacter}
				>
				<button on:click={randomHair}>Random</button>
			</div>
		</div>
	</div>
	<ResetAndRandomButtonRow reset={characterReset} random={randomDescription} />
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
	.block-row {
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
		flex: 1;
	}
</style>