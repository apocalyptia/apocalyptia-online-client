<script>
	import BattleMap from 'views/map/BattleMap.svelte'

	const width = 10000

	const height = 10000
</script>


<div class='map-body'>
	<BattleMap {width} {height} />
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