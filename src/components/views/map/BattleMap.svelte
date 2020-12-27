<script>
	import Canvas from 'views/widgets/Canvas.svelte'
	import Slider from 'views/widgets/Slider.svelte'
	import { mapStore } from 'stores/mapStore.js'
	import { afterUpdate, onMount } from 'svelte'

	onMount(_ => $mapStore.fillContents())

	// const ReDraw = _ => $mapStore = $mapStore.redraw()

	// afterUpdate(_ => $mapStore = $mapStore.redraw())

	const zoomMap = _ => {
		const newCellSize = Math.round(150 * $mapStore.mag)
		console.log(newCellSize)
		document.documentElement.style.setProperty(`--cell-size`, `${newCellSize}px`)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class='canvas-frame'>
	<!-- <svelte:component this={Canvas} /> -->

	<table>
		{#each $mapStore.contents as row, ri}
			<tr>
			{#each row as col, ci}
				<td>
					<span class='cell-coordinates'>{ri},{ci}<span>
				</td>
			{/each}
			</tr>
		{/each}
	</table>
</div>
<div class='slide-container'>
	-<Slider min=.1 max=5 step=.1
		bind:value={$mapStore.mag}
		func={zoomMap}
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
	.cell-coordinates {
		font-size: var(--s50);
	}
	table, tr, td {
		border: 1px dotted var(--pri-color-trans);
	}
	tr {
		height: var(--cell-size);
	}
	td {
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