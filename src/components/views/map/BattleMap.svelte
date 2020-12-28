<script>
	import Canvas from 'views/widgets/Canvas.svelte'
	import Slider from 'views/widgets/Slider.svelte'
	import { mapStore } from 'stores/mapStore.js'
	import { afterUpdate, onMount } from 'svelte'

	onMount(_ => $mapStore.fillContents())

	// const ReDraw = _ => $mapStore = $mapStore.redraw()

	// afterUpdate(_ => $mapStore = $mapStore.redraw())

	const zoomMap = _ => {
		$mapStore.currentSquare = Math.round($mapStore.startingSquare * $mapStore.magnification)
		document.documentElement.style.setProperty(`--cell-size`, `${$mapStore.currentSquare}px`)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class='canvas-frame'>
	<!-- <svelte:component this={Canvas} /> -->

	<div class='table'>
		{#each $mapStore.contents as row, ri}
			<div class='tr'>
			{#each row as col, ci}
				<div class='td {$mapStore.contents[ri][ci].m ? 'red' : ''}'
					on:click={_ => $mapStore = $mapStore.mark(ri, ci)}
				>
				</div>
			{/each}
			</div>
		{/each}
	</div>
</div>
<div class='slide-container'>
	-<Slider min=.25 max=2.5 step=.25
		bind:value={$mapStore.magnification}
		func={zoomMap}
	/>+
</div>


<style>
	.red {
		background-color: red;
	}
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
	.cell-coordinates {
		font-size: var(--s50);
	}
	.td {
		border: 1px dotted var(--pri-color-trans);
	}
	.tr {
		height: var(--cell-size);
		display: flex;
	}
	.td {
		height: var(--cell-size);
		min-width: var(--cell-size);
		max-width: var(--cell-size);
		width: var(--cell-size);
	}
	.slide-container {
		bottom: var(--std-margin);
		display: flex;
		right: calc(var(--std-margin) * 1.5);
		position: fixed;
		width: 75vw;
	}
</style>