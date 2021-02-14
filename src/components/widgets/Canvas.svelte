<script>
	import mapStore from 'stores/mapStore.js'
	import { onMount } from 'svelte'

	onMount(_ => {
		$mapStore = $mapStore.init(document.getElementById('map-canvas'))
		document.getElementById('map-canvas').addEventListener('touchstart', log)
	})

	const log = (e) => console.log(e.touches[0])
</script>


<div class='canvas-container'
	bind:clientWidth={$mapStore.canvas.width}
	bind:clientHeight={$mapStore.canvas.height}
>
	<canvas id='map-canvas' bind:this={$mapStore.canvas} />
	<!-- <slot /> -->
</div>


<style>
	.canvas-container {
		height: 100%;
		width: 100%;
	}
</style>