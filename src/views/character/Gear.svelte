<script>
	import Gear from '../../rules/gear/GearList'
	import GearCategory from './GearCategory.svelte'
	import { character } from '../../stores/characterStore'

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