<script>
	import characterStore from '/src/stores/characterStore.js'

	export let mode = 'readonly'

	const propertiesList = Object.keys($characterStore.properties).filter((p) => p != 'health')

	const leftColumn = propertiesList.slice(0, propertiesList.length / 2)

	const rightColumn = propertiesList.slice(propertiesList.length / 2, propertiesList.length)
</script>

<div class='sheet-card-body'>
	<div class='prop-block'>
		{#each leftColumn as leftProp}
			<div class='prop-item'>
				<h4>{$characterStore.properties[leftProp].name}</h4>
				:
				{#if $characterStore.properties[leftProp].hasOwnProperty('current')}
					{#if mode === 'readonly'}
						{$characterStore.properties[leftProp].current}
					{:else}
						<input
							type='number'
							class='current-value'
							bind:value={$characterStore.properties[leftProp].current}
							min='0'
							max={$characterStore.properties[leftProp].score}
						/>
					{/if} /
				{/if}
				{$characterStore.properties[leftProp].score}
			</div>
		{/each}
	</div>
	<div class='divider' />
	<div class='prop-block'>
		{#each rightColumn as rightProp}
			<div class='prop-item'>
				<h4>{$characterStore.properties[rightProp].name}</h4>
				:
				{#if $characterStore.properties[rightProp].hasOwnProperty('current')}
					{#if mode === 'readonly'}
						{$characterStore.properties[rightProp].current}
					{:else}
						<input
							type='number'
							class='current-value'
							bind:value={$characterStore.properties[rightProp].current}
							min='0'
							max={$characterStore.properties[rightProp].score}
						/>
					{/if} /
				{/if}
				{$characterStore.properties[rightProp].score}
			</div>
		{/each}
	</div>
</div>

<style>
	.sheet-card-body {
		display: flex;
		justify-content: space-around;
	}
	.current-value {
		width: 6ch;
	}
	.divider {
		width: var(--std-padding);
	}
	.prop-block {
		align-items: space-between;
		display: flex;
		flex-direction: column;
		height: calc(var(--s100) * 8);
		justify-content: space-between;
		width: 50%;
	}
</style>
