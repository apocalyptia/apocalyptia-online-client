<script>
	import mapStore from '$stores/mapStore.js'
	import { onMount } from 'svelte'

	onMount(() => ($mapStore = $mapStore.fillContents()))

	function zoomMap(zoom) {
		if ($mapStore.magnification > 0.25 && zoom === 'out') {
			$mapStore.magnification -= 0.25
		} else if ($mapStore.magnification < 3 && zoom === 'in') {
			$mapStore.magnification += 0.25
		}
		$mapStore.currentSquare = Math.round($mapStore.startingSquare * $mapStore.magnification)
		document.documentElement.style.setProperty(`--cell-size`, `${$mapStore.currentSquare}px`)
		let mapFrame = document.querySelector('.map-frame')
		// mapFrame.scrollBy((mapFrame.offsetWidth / 4), (mapFrame.offsetHeight / 4))
	}
</script>

<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class="map-frame">
	<div class="map-grid" style="height: {$mapStore.pixelSize()}px; width: {$mapStore.pixelSize()}px;" on:scroll={console.log(document.querySelector('.map-frame').offsetHeight)}>
		{#each $mapStore.contents as row, ri}
			<div class="grid-row">
				{#each row as col, ci}
					<div class="grid-cell {$mapStore.contents[ri][ci].m ? 'red' : ''}" on:click={() => ($mapStore = $mapStore.mark(ri, ci))} />
				{/each}
			</div>
		{/each}
	</div>
</div>
<div class="zoom-controller">
	<div class="zoom-indicator">
		Zoom {$mapStore.magnification * 100}%
	</div>
	<div class="zoom-buttons">
		<button on:click={() => zoomMap('out')}>-</button>
		<button on:click={() => zoomMap('in')}>+</button>
	</div>
</div>


<style>
	.red {
		background-color: red;
	}
	.map-frame {
		align-items: center;
		border: 3px solid var(--pri-color);
		bottom: 0;
		display: flex;
		justify-content: center;
		left: 0;
		opacity: 0.6;
		overflow: scroll;
		position: absolute;
		right: 0;
		top: 0;
	}
	.map-grid {
		background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/northernlights.jpg);
		background-size: cover;
		background-repeat: no-repeat;
	}
	.grid-row {
		border-bottom: 1px dotted var(--pri-color-trans);
		display: flex;
		height: var(--cell-size);
	}
	.grid-cell {
		border-right: 1px dotted var(--pri-color-trans);
		height: var(--cell-size);
		min-width: var(--cell-size);
		max-width: var(--cell-size);
		width: var(--cell-size);
	}
	.zoom-controller {
		bottom: 0;
		position: fixed;
		right: 0;
	}
	.zoom-indicator {
		font-size: var(--s125);
	}
	.zoom-indicator,
	.zoom-buttons {
		display: flex;
	}
	button {
		font-size: var(--s150);
		height: var(--square);
		width: var(--square);
	}
</style>
