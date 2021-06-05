<script>
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import ResetAndRandomButtonRow from '/src/components/buttons/ResetAndRandomButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import creationStore from '/src/stores/creationStore.js'

	function resetDescription() {
		$characterStore.resetDescription()
		$characterStore = $characterStore
	}

	function randomDescription(type) {
		$characterStore.randomDescription(type)
		$characterStore = $characterStore
	}

	function canProceed() {
		$characterStore.canProceed($creationStore.step)
		$characterStore = $characterStore
	}
</script>

<div class='description-step-page'>
	<fieldset>
		<PageHeader chapter={'Description'} step={$characterStore.step} />
		<div class='section-card'>
			{#each Object.values($characterStore.description) as description}
				{#if description.name != 'Player'}
					<div class='description-container'>
						<span class='description-label'>{description.name}:</span>
						<input type='text' class='description-value' bind:value={description.value} on:input={() => canProceed()} />
						<div class='random-container'>
							<button class='random-button' on:click={() => randomDescription(description.name)}> Random </button>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<ResetAndRandomButtonRow reset={() => resetDescription()} random={() => randomDescription('All')} />
	</fieldset>
</div>

<style>
	.description-container {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: var(--s50) 0;
		max-width: 100%;
		width: 100%;
	}
	.description-label {
		text-align: right;
		flex: 1;
	}
	.description-value {
		flex: 2;
	}
	.random-container {
		display: flex;
		flex: 1;
		justify-content: space-around;
	}
	.random-button {
		min-width: 80%;
	}
</style>
