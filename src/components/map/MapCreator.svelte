<script>
	import mapStore from '/src/stores/mapStore.js'
</script>

<svelte:head>
	<title>Apocalyptia Online - Map Creator</title>
</svelte:head>
<div class='map-page'>
	<div class='cntr-card map-creator-menu'>
		<div class='menu-row'>
			Columns:
			<input type='number' min='1' max='1000' bind:value={$mapStore.cols} />
		</div>
		<div class='menu-row'>
			Rows:
			<input type='number' min='1' max='1000' bind:value={$mapStore.rows} />
		</div>
		<div class='btn-row'>
			<button on:click={() => ($mapStore = $mapStore.create())}> Create Map </button>
		</div>
	</div>
</div>

<style>
	.map-creator-menu {
		height: 30vh;
		top: calc(50vh - var(--square));
	}
	.menu-row {
		margin-right: 25%;
		text-align: right;
		width: 100%;
	}
	button {
		min-width: 50%;
	}
</style>
