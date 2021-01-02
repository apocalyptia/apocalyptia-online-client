<script>
	// import BattleMap from 'views/map/BattleMapCanvas.svelte'
	import BattleMap from 'views/map/BattleMapDom.svelte'
	import MapCreator from 'views/map/MapCreator.svelte'
	import BackButton from 'views/buttons/BackButton.svelte'
	import { mapStore } from 'stores/mapStoreDOM.js'
</script>


<div class='map-page-body'>
	<!-- {#if $mapStore.ready} -->
		<BattleMap />
	<!-- {:else}
		<MapCreator />
	{/if} -->
</div>
<BackButton path={'/'} />


<style>
	.map-page-body {
		bottom: 0;
		left: 0;
		overflow: scroll;
		position: absolute;
		right: 0;
		top: var(--square);
	}
</style>