<script>
	import Creation from 'rules/Creation.js'
	import DiceButton from 'components/buttons/DiceButton.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import RandomDescription from 'rules/random/RandomDescription.js'
	import RandomDescriptionSwitch from 'rules/random/RandomDescriptionSwitch.js'
	import ResetAndRandomButtonRow from 'components/buttons/ResetAndRandomButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'
	import { afterUpdate } from 'svelte'

	afterUpdate(_ => SaveCharacter())
</script>


<div class='description-step-page'>
	<PageHeader chapter={'Description'} step={$characterStore.meta.step} />
	<div class='section-card'>
		{#each Object.values($characterStore.description) as desc}
			<div class='desc-container'>
				<span class='desc-label'>{desc.name}:</span>
				<input type='text' bind:value={desc.value}>
				<DiceButton
					type={desc.name}
					func={_ => $characterStore.description[desc.name.toLowerCase()].value = RandomDescriptionSwitch(desc)}
				/>
			</div>
		{/each}
	</div>
	<ResetAndRandomButtonRow
		reset={_ => $characterStore = Creation.resetDescription($characterStore)}
		random={_ => $characterStore = RandomDescription($characterStore)}
	/>
</div>


<style>
	.desc-container {
		align-items: center;
		display: flex;
		justify-content: space-evenly;
		margin: var(--s50) 0;
		max-width: 100%;
		width: 100%;
	}
	.desc-label {
		text-align: right;
		flex: 1;
	}
	input[type='text'] {
		flex: 2;
		margin-left: var(--s33);
		margin-right: var(--s33);
	}
</style>