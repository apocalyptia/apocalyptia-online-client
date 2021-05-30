<script>
	import characterStore from '/src/stores/characterStore.js'

	const propertiesList = Object.keys($characterStore.properties).filter((p) => p != 'health')
</script>

<div class="section-card properties-list">
	{#each propertiesList as prop}
		<p class="prop-item">
			{$characterStore.properties[prop].name}:
			{$characterStore.properties[prop].score}
		</p>
	{/each}
</div>

<style>
	.properties-list {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	/* MOBILE */
	@media only screen and (max-width: 600px) {
		.prop-item {
			width: 66%;
		}
	}
	/* DESKTOP */
	@media only screen and (min-width: 600px) {
		.prop-item {
			width: 33%;
		}
	}
</style>
