<script>
	import DrawGrid from 'utils/drawing/DrawGrid.js'
	// import DrawSquare from 'utils/drawing/DrawSquare.js'
	import { onMount } from 'svelte'

	export let cols, rows

	const square = {
		'w': 50,
		'h': 50
	}

	onMount(_ => {
		let canvas = document.getElementById('map')
		let ctx = canvas.getContext('2d')
		DrawGrid(ctx, rows, cols, square, 'rgba(0, 255, 0, 1)')
	})
</script>


<canvas id='map'
	width={cols * square.w}
	height={rows * square.h}
/>


<style>
	canvas {
		left: 0;
		opacity: .6;
		overflow: scroll;
		position: absolute;
		top: 0;
	}
</style>