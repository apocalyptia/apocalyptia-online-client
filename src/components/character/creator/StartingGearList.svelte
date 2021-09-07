<script>
	import characterStore from '/src/stores/characterStore.js'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
</script>


<div class="section-card">
	{#each Object.values($characterStore.gear) as category (category.name)}
		<div class="gear-list-details">
			<details>
				<summary>{category.name}</summary>
				<div class="details-content">
					{#if category.name === 'Equipment'}
						{#each category.inventory as equipment (equipment.name)}
							<div class="item">
								<GearBlock item={equipment} mode={'readonly'} />
							</div>
						{/each}
					{:else}
						<div class="item">
							<GearBlock item={category.inventory[0]} mode={'readonly'} />
						</div>
					{/if}
				</div>
			</details>
		</div>
	{/each}
</div>


<style>
	.gear-list-details {
		margin: var(--margin) 0;
	}
	.details-content {
		display: block;
	}
	.item {
		padding: var(--padding);
	}
</style>