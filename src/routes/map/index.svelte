<script>
	import BattleMap from 'views/map/BattleMap.svelte'

	const cols = 100

	const rows = 100
</script>


<div class='map-body'>
	<BattleMap {cols} {rows} />
</div>


<style>
	.map-body {
		left: 0;
		overflow: scroll;
		position: absolute;
		top: var(--square);
		right: 0;
		bottom: 0;
	}
</style>