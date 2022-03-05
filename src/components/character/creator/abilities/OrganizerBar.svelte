<script>
	import abilitiesStore from '$stores/abilitiesStore.js'
	import characterStore from '$stores/characterStore.js'

	function filterList() {
		$abilitiesStore = $abilitiesStore.filterList($characterStore.properties.experience.current)
	}

	function sortList() {
		$abilitiesStore = $abilitiesStore.sortList()
	}

	function toggleList() {
		console.log($abilitiesStore.display)
		$abilitiesStore = $abilitiesStore.toggleList()
	}
</script>


<!-- svelte-ignore a11y-no-onchange -->
<div class="organizer-details">
	<div class="filter-section organizer-column">
		<div class="organizer-row">
			<span>XP:</span>
			<select bind:value={$abilitiesStore.cost} on:change={filterList}>
				<option value={'all'}>All</option>
				<option value={3}>3</option>
				<option value={6}>6</option>
				<option value={9}>9</option>
				<option value={12}>12</option>
				<option value={15}>15</option>
				<option value={18}>18</option>
				<option value={21}>21</option>
				<option value={24}>24</option>
				<option value={30}>30</option>
				<option value={'valid'}>Valid</option>
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
		<div class="organizer-row">
			<span>Sort:</span>
			<select class="xp-cost-selector" bind:value={$abilitiesStore.order} on:change={sortList}>
				<option value="alpha" selected>A-Z</option>
				<option value="zeta">Z-A</option>
				<option value="xphigh">XP ^</option>
				<option value="xplow">XP v</option>
			</select>
		</div>
		<div class="organizer-row">
			<span>Display:</span>
			<select class="xp-cost-selector" bind:value={$abilitiesStore.display} on:change={toggleList}>
				<option value="Hide">Hide</option>
				<option value="Show">Show</option>
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
	.organizer-row {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: var(--margin);
	}
</style>
