<script>
	import adjustUIColor from '/src/utils/ui/adjustUIColor.js'
	import characterStore from '/src/stores/characterStore.js'

	export let side, mode

	function adjustHealth() {
		Object.values($characterStore.properties.health.locations).forEach((location) => {
			if (location.current > location.score) location.current = location.score
		})
		adjustUIColor($characterStore)
	}
</script>

<div class="column">
	{#each side as location}
		<div class="{location}-label">
			<h4 class="body-part-name">
				{$characterStore.properties.health.locations[location].name}
			</h4>
			<div class="body-part-numbers">
				{#if mode === 'readonly'}
					{$characterStore.properties.health.locations[location].score}
				{:else}
					<input
						type="number"
						bind:value={$characterStore.properties.health.locations[location].current}
						min={$characterStore.properties.health.locations[location].score * -1}
						max={$characterStore.properties.health.locations[location].score}
						on:change={adjustHealth}
					/>
				{/if} / {$characterStore.properties.health.locations[location].score}
			</div>
		</div>
	{/each}
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 100%;
	}
	.body-part-name {
		display: block;
		text-align: center;
	}
	.body-part-numbers {
		margin: 5px;
	}
	input[type='number'] {
		width: 4ch;
	}
</style>
