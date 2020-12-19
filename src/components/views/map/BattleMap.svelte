<script>
	import DrawGrid from 'utils/drawing/DrawGrid.js'
	// import DrawSquare from 'utils/drawing/DrawSquare.js'
	import { onMount } from 'svelte'

	export let width, height

	const square = {
		'w': 50,
		'h': 50
	}

	const rows = height / square.h

	const cols = width / square.w

	onMount(_ => {
		let canvas = document.getElementById('map')
		let ctx = canvas.getContext('2d')
		// DrawSquare({ ctx, 'x': 0, 'y': 0, 'w': width, 'h': height, 'f': 'rgba(0, 50, 0, 1)' })
		DrawGrid(ctx, rows, cols, square, 'rgba(0, 255, 0, 1)')
	})
</script>


<canvas id='map' {width} {height} />


<style>
	canvas {
		left: 0;
		opacity: .6;
		overflow: scroll;
		position: absolute;
		top: 0;
	}
</style>