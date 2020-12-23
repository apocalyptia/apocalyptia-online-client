<script>
	import Canvas from 'views/widgets/Canvas.svelte'
	import { mapStore } from 'stores/mapStore.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class='canvas-frame' >
	<svelte:component this={Canvas} />
</div>
<div class='slide-container'>
	-<input type='range'
			name='Zoom'
			min=1 max=200
			bind:value={$mapStore.magnification}
			on:input={_ => {
				console.log($mapStore.magnification)
				$mapStore = $mapStore.zoom()
			}}
	>+
</div>


<style>
	.canvas-frame {
		align-items: middle;
		border: 3px solid var(--pri-color);
		display: flex;
		justify-content: space-around;
		left: 0;
		margin: auto 0;
		opacity: .6;
		overflow: scroll;
		position: absolute;
		top: 0;
		padding: var(--std-padding);
	}
	.slide-container {
		bottom: var(--s100);
		display: flex;
		position: fixed;
		right: var(--s100);
		width: calc(100vw - var(--square) - var(--std-margin));
	}
</style>