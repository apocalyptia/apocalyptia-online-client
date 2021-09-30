<script>
	import characterStore from '/src/stores/characterStore.js'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'

	const gearList = Object.values($characterStore.gear)

	gearList.forEach(category => category.open = false)
</script>


{#each gearList as category (category.name)}
	<div class="gear-list-details">
		<details>
			<summary>
				<span>{category.open ? '-' : '+'}</span>
				<h2>{category.name}</h2>
			</summary>
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


<style>
	.gear-list-details {
		margin: var(--margin) 0;
	}
	span {
		margin-right: var(--margin);
	}
	.details-content {
		display: block;
	}
	.item {
		padding: var(--padding);
	}
</style>