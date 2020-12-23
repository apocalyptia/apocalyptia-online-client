<script>
	import { mapStore } from 'stores/mapStore.js'
	import { onMount } from 'svelte'
	import DrawGrid from 'utils/drawing/DrawGrid.js'

	onMount(_ => {
		$mapStore.ctx = document.getElementById('map-canvas').getContext('2d')
		$mapStore = DrawGrid($mapStore, [2,2], 'rgb(0, 255, 0)')
	})
</script>


<canvas id='map-canvas' width={$mapStore.w+2} height={$mapStore.h+2} />
<slot />