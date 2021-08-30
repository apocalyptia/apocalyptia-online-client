<script>
	import abilitiesStore from '/src/stores/abilitiesStore.js'

	function filterList() {
		$abilitiesStore.filterList()
		$abilitiesStore = $abilitiesStore
	}

	function sortList() {
		$abilitiesStore.sortList()
		$abilitiesStore = $abilitiesStore
	}
</script>


<!-- svelte-ignore a11y-no-onchange -->
<div class="organizer-details">
	<div class="filter-section organizer-column">
		<div class="organizer-header">
			Filter
		</div>
		<div class="organizer-row">
			<span>XP:</span>
			<select bind:value={$abilitiesStore.cost} on:change={filterList}>
				<option value={0}>All</option>
				{#each [...$abilitiesStore.xpCosts] as xpCost}
					<option value={xpCost}>{xpCost}</option>
				{/each}
			</select>
		</div>
		<div class="organizer-row">
			<span>Taken:</span>
			<select bind:value={$abilitiesStore.status} on:change={filterList}>
				<option value="all">All</option>
				<option value="yes">Yes</option>
				<option value="no">No</option>
			</select>
		</div>
	</div>
	<div class="sort-section organizer-column">
		<div class="organizer-header">
			Sort
		</div>
		<div class="organizer-row">
			<span>By:</span>
			<select class="xp-cost-selector" bind:value={$abilitiesStore.order} on:change={sortList}>
				<option value="alpha" selected>A-Z</option>
				<option value="zeta">Z-A</option>
				<option value="xphigh">XP ^</option>
				<option value="xplow">XP v</option>
			</select>
		</div>
	</div>
</div>


<style>
	.organizer-details {
		display: flex;
		justify-content: space-around;
		padding: 0;
	}
	.organizer-header {
		display: flex;
		font-weight: bold;
		justify-content: center;
		margin: var(--margin);
		text-decoration: underline;
	}
	.organizer-row {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: var(--margin);
	}
</style>
