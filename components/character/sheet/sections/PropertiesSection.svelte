<script>
	import characterStore from '/src/stores/characterStore.js'

	export let mode = 'readonly'

	const propertiesList = Object.values($characterStore.properties)

	const propertyListHalves = [
		propertiesList.slice(0, (propertiesList.length / 2)),
		propertiesList.slice(propertiesList.length / 2, propertiesList.length)
	]
</script>


<div class='sheet-card-body'>
	{#each propertyListHalves as halfProp}
		<div class='sheet-card-block'>
			{#each halfProp as p}
				<div class='sheet-card-item'>
					<div class='prop-label'>
						{$characterStore.properties[p.name.toLowerCase()].name}:
					</div>
					<div class='prop-score'>
						{#if $characterStore.properties[p.name.toLowerCase()].hasOwnProperty('current')}
							{#if mode === 'readonly'}
								{$characterStore.properties[p.name.toLowerCase()].current}
							{:else}
								<input type='number'
									class='current-value'
									bind:value={$characterStore.properties[p.name.toLowerCase()].current}
									min=0 max={$characterStore.properties[p.name.toLowerCase()].score}
								/>
							{/if} / 
						{/if}
						{$characterStore.properties[p.name.toLowerCase()].score}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>


<style>
	.sheet-card-body {
		display: flex;
		justify-content: space-around;
	}
	.sheet-card-item {
		flex: 1;
	}
	.current-value {
		width: 6ch;
	}
</style>