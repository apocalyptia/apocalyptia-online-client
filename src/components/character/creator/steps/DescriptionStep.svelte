<script>
	import PageHeader from '$components/character/creator/PageHeader.svelte'
	import ResetAndRandomButtonRow from '$components/character/creator/ResetAndRandomButtonRow.svelte'
	import characterStore from '$stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	function resetDescription() {
		$characterStore = $characterStore.resetDescription()
	}

	function randomDescription(type) {
		$characterStore = $characterStore.randomDescription(type)

	}

	function canProceed() {
		$characterStore = $characterStore.creationCanProceed()
	}

	beforeUpdate(() => canProceed())
</script>


<div class="description-step-page">
	<fieldset>
		<PageHeader chapter={'Description'} />
		<div class="section-card">
			{#each Object.values($characterStore.description) as description}
				{#if description.name != 'Player'}
					<div class="description-container">
						<span class="description-label">{description.name}:</span>
						<input type="text" class="description-value" bind:value={description.value} on:input={() => canProceed()} />
						<div class="random-container">
							<button class="random-button" on:click={() => randomDescription(description.name)}> Random </button>
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
