<script>
	import Creation from 'rules/Creation.js'
	import DiceButton from 'components/buttons/DiceButton.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import RandomAge from 'rules/random/RandomAge.js'
	import RandomDescription from 'rules/random/RandomDescription.js'
	import RandomHair from 'rules/random/RandomHair.js'
	import RandomHeight from 'rules/random/RandomHeight.js'
	import RandomName from 'rules/random/RandomName.js'
	import RandomSex from 'rules/random/RandomSex.js'
	import RandomSkin from 'rules/random/RandomSkin.js'
	import RandomWeight from 'rules/random/RandomWeight.js'
	import ResetAndRandomButtonRow from 'components/buttons/ResetAndRandomButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'
	import { afterUpdate } from 'svelte'

	afterUpdate(_ => SaveCharacter())
</script>


<div class='description-step-page'>
	<PageHeader chapter={'Description'} step={$characterStore.meta.step} />
	<div class='section-card'>
		<div class='block-row'>
			<div class='character-container'>
				<span>Name:</span>
				<input type='text' bind:value={$characterStore.description.name.value}>
				<DiceButton type='Name'
					func={_ => $characterStore.description.name.value = RandomName($characterStore)} />
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Age:</span>
				<input type='text' bind:value={$characterStore.description.age.value}>
				<DiceButton type='Age'
					func={_ => $characterStore.description.age.value = RandomAge()} />
			</div>
			<div class='item-container'>
				<span>Sex:</span>
				<input type='text' bind:value={$characterStore.description.sex.value}>
				<DiceButton type='Sex'
					func={_ => $characterStore.description.sex.value = RandomSex()} />
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Height:</span>
				<input type='text' bind:value={$characterStore.description.height.value}>
				<DiceButton type='Height'
					func={_ => $characterStore.description.height.value = RandomHeight($characterStore)} />
			</div>
			<div class='item-container'>
				<span>Weight:</span>
				<input type='text' bind:value={$characterStore.description.weight.value}>
				<DiceButton type='Weight'
					func={_ => $characterStore.description.weight.value = RandomWeight($characterStore)} />
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Skin:</span>
				<input type='text' bind:value={$characterStore.description.skin.value}>
				<DiceButton type='Skin'
					func={_ => $characterStore.description.skin.value = RandomSkin()} />
			</div>
			<div class='item-container'>
				<span>Hair:</span>
				<input type='text' bind:value={$characterStore.description.hair.value}>
				<DiceButton type='Hair'
					func={_ => $characterStore.description.hair.value = RandomHair($characterStore)} />
			</div>
		</div>
	</div>
	<ResetAndRandomButtonRow
		reset={_ => $characterStore = Creation.resetDescription($characterStore)}
		random={_ => $characterStore = RandomDescription($characterStore)}
	/>
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
	div[class*='-container'] > span {
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
		flex: 2;
	}
</style>