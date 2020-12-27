<script>
	import Canvas from 'views/widgets/Canvas.svelte'
	import Slider from 'views/widgets/Slider.svelte'
	import { mapStore } from 'stores/mapStore.js'
	import { afterUpdate } from 'svelte'

	afterUpdate(_ => $mapStore = $mapStore.redraw())
</script>


<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class='canvas-frame'>
	<svelte:component this={Canvas} />
</div>
<div class='slide-container'>
	-<Slider min=.1 max=2 step=.1
		bind:value={$mapStore.mag}
		func={_ => $mapStore = $mapStore.redraw()}
	/>+
</div>


<style>
	.canvas-frame {
		border: 3px solid var(--pri-color);
		bottom: var(--std-margin);
		left: var(--std-margin);
		opacity: .6;
		overflow: scroll;
		position: absolute;
		right: var(--std-margin);
		top: var(--std-margin);
	}
	.slide-container {
		bottom: var(--std-margin);
		display: flex;
		right: calc(var(--std-margin) * 1.5);
		position: fixed;
		width: 75vw;
	}
</style>