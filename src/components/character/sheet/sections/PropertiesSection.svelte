<script>
	import characterStore from '/src/stores/characterStore.js'

	export let mode = 'readonly'

	const propertiesList = Object.keys($characterStore.properties).filter((p) => p != 'health')

	const columns = [propertiesList.slice(0, propertiesList.length / 2), propertiesList.slice(propertiesList.length / 2, propertiesList.length)]
</script>


<div class="sheet-card-body">
	{#each columns as column}
		<div class="prop-column">
			{#each column as prop}
				<div class="prop-item">
					<label class="prop-label" for={$characterStore.properties[prop].name}>
						<h4>{$characterStore.properties[prop].name}</h4>
					</label>
					<div id={$characterStore.properties[prop].name} class="prop-value">
						{#if mode === 'readonly'}
							{$characterStore.properties[prop].current}
						{:else}
							<input type="number" class="current-value" bind:value={$characterStore.properties[prop].current} min="0" max={$characterStore.properties[prop].score} />
						{/if} /
						{$characterStore.properties[prop].score}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>


<style>
	.sheet-card-body {
		display: flex;
		justify-content: space-between;
	}
	.current-value {
		width: 6ch;
	}
	.prop-column {
		align-items: space-between;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 48%;
	}
	.prop-column div {
		margin-bottom: var(--margin);
	}
	.prop-column div:last-child {
		margin-bottom: 0;
	}
	.prop-item {
		border: 1px dotted;
		display: block;
		padding: var(--padding);
		text-align: center;
	}
	.prop-label {
		margin-bottom: var(--margin);
		width: 100%;
	}
</style>
