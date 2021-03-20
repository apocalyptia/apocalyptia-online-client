<script>
	import Creation from '/src/rules/Creation.js'
	import DiceButton from '/src/components/buttons/DiceButton.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import RandomDescription from '/src/rules/random/RandomDescription.js'
	import RandomDescriptionSwitch from '/src/rules/random/RandomDescriptionSwitch.js'
	import ResetAndRandomButtonRow from '/src/components/buttons/ResetAndRandomButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'

	const updateDesc = _ => {
		Creation.proceedCheck($characterStore)
		$characterStore = $characterStore
	}

	const randomDescription = (desc) => {
		$characterStore.description[desc.name.toLowerCase()].value = RandomDescriptionSwitch(desc.name)
	}
</script>


<div class='description-step-page'>
	<PageHeader chapter={'Description'} step={$characterStore.meta.step} />
	<div class='section-card'>
		{#each Object.values($characterStore.description) as desc}
			{#if desc.name != 'Player'}
				<div class='desc-container'>
					<span class='desc-label'>{desc.name}:</span>
					<input class='desc-value' type='text' bind:value={desc.value} on:input={updateDesc}>
					<div class='dice-container'>
						<DiceButton func={_ => randomDescription(desc)} />
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<ResetAndRandomButtonRow
		reset={_ => $characterStore = $characterStore.resetDescription()}
		random={_ => $characterStore = RandomDescription($characterStore)}
	/>
</div>


<style>
	.desc-container {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: var(--s50) 0;
		max-width: 100%;
		width: 100%;
	}
	.desc-label {
		text-align: right;
		flex: 1;
	}
	.desc-value {
		flex: 2;
	}
	.dice-container {
		display: flex;
		flex: 1;
		justify-content: space-around;
	}
</style>