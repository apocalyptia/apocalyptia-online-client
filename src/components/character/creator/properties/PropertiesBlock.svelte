<script>
	import characterStore from '/src/stores/characterStore.js'

	const propertiesList = Object.keys($characterStore.properties).filter((p) => p != 'health')

	const leftColumn = propertiesList.slice(0, propertiesList.length / 2)

	const rightColumn = propertiesList.slice(propertiesList.length / 2, propertiesList.length)
</script>

<div class="properties-list">
	<div class="prop-block">
		{#each leftColumn as leftProp}
			<div class="prop-item">
				<h4>{$characterStore.properties[leftProp].name}</h4>
				:
				{$characterStore.properties[leftProp].score}
			</div>
		{/each}
	</div>
	<div class="divider" />
	<div class="prop-block">
		{#each rightColumn as rightProp}
			<div class="prop-item">
				<h4>{$characterStore.properties[rightProp].name}</h4>
				:
				{$characterStore.properties[rightProp].score}
			</div>
		{/each}
	</div>
</div>

<style>
	.properties-list {
		display: flex;
		justify-content: space-between;
		padding-bottom: var(--padding);
		padding-top: var(--padding);
		text-align: left;
	}
	.divider {
		width: var(--padding);
	}
	.prop-block {
		align-items: space-between;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 50%;
	}
	.prop-block div {
		margin-bottom: var(--margin);
	}
	.prop-block:last-child {
		margin-bottom: 0;
	}
</style>
