<script>
	import PropertiesList from '/src/rules/lists/PropertiesList.js'
    import characterStore from '/src/stores/characterStore.js'

	const propertyListHalves = [
		PropertiesList.list.slice(0, (PropertiesList.list.length / 2)),
		PropertiesList.list.slice(PropertiesList.list.length / 2, PropertiesList.list.length)
	]
</script>


<div class='section-card properties-list'>
	{#each propertyListHalves as halfProp}
		<div class='prop-block'>
			{#each halfProp as p}
				<div class='prop-item'>
					{$characterStore.properties[p.name.toLowerCase()].name}: 
					{$characterStore.properties[p.name.toLowerCase()].score}
				</div>
			{/each}
		</div>
	{/each}
</div>


<style>
    .properties-list {
		display: flex;
		justify-content: space-between;
		text-align: left;
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