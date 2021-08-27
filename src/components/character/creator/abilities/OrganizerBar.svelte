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
<div class="section-card">
	<div class="filter-section">
		<div class="header organizer-row">Filter</div>
		<div class="organizer-row">
			XP: <select bind:value={$abilitiesStore.cost} on:change={filterList}>
				<option value={0}>All</option>
				{#each $abilitiesStore.xpCosts as xpCost}
					<option value={xpCost}>{xpCost}</option>
				{/each}
			</select>
		</div>
		<div class="organizer-row">
			Taken: <select bind:value={$abilitiesStore.status} on:change={filterList}>
				<option value="all">All</option>
				<option value="yes">Yes</option>
				<option value="no">No</option>
			</select>
		</div>
	</div>
	<div class="sort-section">
		<div class="header organizer-row">Sort</div>
		<div class="organizer-row">
			By: <select class="xp-cost-selector" bind:value={$abilitiesStore.order} on:change={sortList}>
				<option value="alpha" selected>A-Z</option>
				<option value="zeta">Z-A</option>
				<option value="xphigh">XP ^</option>
				<option value="xplow">XP v</option>
			</select>
		</div>
	</div>
</div>


<style>
	.section-card {
		display: flex;
		justify-content: space-around;
		padding: 0;
	}
	.header {
		font-weight: bold;
		text-align: center;
		text-decoration: underline;
	}
	.organizer-row {
		display: block;
		margin: var(--margin);
	}
</style>
