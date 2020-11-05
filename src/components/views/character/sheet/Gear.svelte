<script>
	import Gear from 'lists/gear/GearList.js'
	import GearCategory from 'views/character/sheet/GearCategory.svelte'

	export let mode = 'readonly'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>Gear</summary>
	<div class='sheet-card'>
		<div class='gear-category-list'>
			{#each Gear.categories as category}
				<GearCategory {mode} {category} />
			{/each}
		</div>
	</div>
</details>