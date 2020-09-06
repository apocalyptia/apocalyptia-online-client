<script>
	import GearCategory from './GearCategory.svelte'
	import { character } from '../../stores/characterStore'

	export let readonly = false

	const gearList = [
		'melee',
		'ranged',
		'ammo',
		'armor',
		'equipment'
	]
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>Gear</summary>
	<div class='gear-category-list'>
		{#each gearList as gearType}
			<GearCategory {gearType} {readonly} />
		{/each}
	</div>
</details>


<style>
	details {
		margin: 0;
	}
	.sheet-card {
		margin: var(--s100);
		padding: 0;
	}
	.gear-category-list {
		padding: var(--s100);
	}
</style>