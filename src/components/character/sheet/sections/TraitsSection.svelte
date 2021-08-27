<script>
	import characterStore from '/src/stores/characterStore.js'

	export const mode = 'readonly'
</script>


<div class="sheet-card-body">
	{#each Object.values($characterStore.traits) as trait}
		<div class="sheet-card-item">
			<h3>{trait.name}: {trait.score}</h3>
		</div>
	{/each}
</div>


<style>
	.sheet-card-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.sheet-card-item {
		display: inline-block;
	}
</style>
