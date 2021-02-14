<script>
	// import BattleMap from 'components/map/BattleMapCanvas.svelte'
	import BattleMap from 'components/map/BattleMapDom.svelte'
	import MapCreator from 'components/map/MapCreator.svelte'
	import BackButton from 'components/buttons/BackButton.svelte'
	import mapStore from 'stores/mapStore.js'
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