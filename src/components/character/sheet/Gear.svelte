<script>
	import Gear from 'rules/lists/GearList.js'
	import GearCategory from 'components/character/sheet/GearCategory.svelte'

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