<script>
	import Creation from '/src/rules/Creation.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import characterStore from '/src/stores/characterStore.js'

	function randomGear() {
		$characterStore.randomGear()
		$characterStore = $characterStore
	}
</script>

<div class="gear-step-page">
	<fieldset>
		<PageHeader chapter={'Gear'} step={$characterStore.step} />
		<ExplanationBlock rule={Creation.gear.description} />
		{#if $characterStore.proceed}
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
		{:else}
		<div class='btn-row'>
			<button class="small-cntr-btn" on:click={randomGear}>Random</button>
		</div>
		{/if}
	</fieldset>
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
	.small-cntr-btn {
		height: var(--square);
	}
</style>
