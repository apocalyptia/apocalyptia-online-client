<script>
	import Canvas from '/src/components/widgets/Canvas.svelte'
	import Slider from '/src/components/widgets/Slider.svelte'
	import mapStore from '/src/stores/mapStore.js'
	import { afterUpdate, onMount } from 'svelte'

	onMount(() => document.querySelector('.canvas-frame').addEventListener('scroll', log))

	function log(e) {
		console.log(e)
	}

	afterUpdate(() => {
		$mapStore = $mapStore.redraw()
		const frame = document.querySelector('.canvas-frame')
		console.log(frame.scrollLeft)
		console.log(frame.scrollRight)
	})
</script>

<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class="canvas-frame">
	<svelte:component this={Canvas} />
</div>
<div class="slide-container">
	-<Slider
		min=".1"
		max="2"
		step=".1"
		bind:value={$mapStore.magnification}
		func={() => ($mapStore = $mapStore.redraw())}
	/>+
</div>

<style>
	.canvas-frame {
		border: 3px solid var(--pri-color);
		bottom: 0;
		left: 0;
		opacity: 0.6;
		overflow: scroll;
		position: absolute;
		right: 0;
		top: 0;
	}
	.slide-container {
		bottom: var(--std-margin);
		display: flex;
		right: var(--std-margin);
		position: fixed;
		width: 75vw;
	}
</style>
