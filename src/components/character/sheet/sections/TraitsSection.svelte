<script>
	import characterStore from '/src/stores/characterStore.js'

	export let mode

	function updateTrait(trait) {
		$characterStore = $characterStore.updateTrait(trait)
		if (mode !== 'readonly') {
			$characterStore = $characterStore.creationCanProceed()
		}
	}
</script>


{#each Object.values($characterStore.traits) as trait}
	<div class="sheet-card-item">
		<h3>{trait.name}:</h3>
		{#if mode === 'readonly'}
			{trait.score}
		{:else}
			<input type='number'
				min=1 max={$characterStore.meta.maxTraits}
				bind:value={trait.score}
				on:change={() => updateTrait(trait)}
			/>
		{/if}
	</div>
{/each}


<style>
	.sheet-card-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
</style>
