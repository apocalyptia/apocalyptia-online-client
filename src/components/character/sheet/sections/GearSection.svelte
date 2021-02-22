<script>
	import characterStore from 'stores/characterStore.js'
	import GearCategory from 'components/character/sheet/gear/GearCategory.svelte'

	export let mode = 'readonly'
</script>


<section>
	<details class='sheet-details'>
		<summary class='sheet-card-title'>Gear</summary>
		<div class='gear-category-list'>
			{#each Object.values($characterStore.gear) as category}
				<GearCategory {mode} {category} />
			{/each}
		</div>
	</details>
</section>


<style>
	.gear-category-list {
		padding: var(--std-padding);
	}
</style>