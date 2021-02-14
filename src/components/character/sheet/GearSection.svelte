<script>
	import characterStore from 'stores/characterStore.js'
	import GearCategory from 'components/character/sheet/GearCategory.svelte'

	export let mode = 'readonly'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>Gear</summary>
	<div class='gear-category-list'>
		{#each Object.values($characterStore.gear) as category}
			<GearCategory {mode} {category} />
		{/each}
	</div>
</details>


<style>
	.gear-category-list {
		padding: var(--std-padding);
	}
</style>