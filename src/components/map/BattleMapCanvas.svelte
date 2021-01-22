<script>
	import Canvas from '$components/widgets/Canvas.svelte'
	import Slider from '$components/widgets/Slider.svelte'
	import mapStore from '$stores/mapStore.js'
	import { afterUpdate, onMount } from 'svelte'

	onMount(_ => {
		document.querySelector('.canvas-frame').addEventListener('scroll', log)
	})

	const log = (e) => console.log(e)

	afterUpdate(_ => {
		$mapStore = $mapStore.redraw()
		const frame = document.querySelector('.canvas-frame')
		console.log(frame.scrollLeft)
		console.log(frame.scrollRight)
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class='canvas-frame'>
	<svelte:component this={Canvas} />
</div>
<div class='slide-container'>
	-<Slider min=.1 max=2 step=.1
		bind:value={$mapStore.magnification}
		func={_ => $mapStore = $mapStore.redraw()}
	/>+
</div>


<style>
	.canvas-frame {
		border: 3px solid var(--pri-color);
		bottom: 0;
		left: 0;
		opacity: .6;
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