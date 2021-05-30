<script>
	import Slider from '/src/components/widgets/Slider.svelte'
	import mapStore from '/src/stores/mapStore.js'
	import { onMount } from 'svelte'

	onMount(() => ($mapStore = $mapStore.fillContents()))

	let xPerspective = 50
	let yPerspective = 50
	$: perspective = `${xPerspective}% ${yPerspective}%`

	let xRotation = 0
	let zRotation = 0

	function zoomMap(zoom) {
		if ($mapStore.magnification > 0.25 && zoom === 'out') {
			$mapStore.magnification -= 0.25
		} else if ($mapStore.magnification < 3 && zoom === 'in') {
			$mapStore.magnification += 0.25
		}
		$mapStore.currentSquare = Math.round($mapStore.startingSquare * $mapStore.magnification)
		document.documentElement.style.setProperty(`--cell-size`, `${$mapStore.currentSquare}px`)
		let mapFrame = document.querySelector('.map-frame')
		console.log(mapFrame.offsetHeight)
		console.log(mapFrame.offsetWidth)
		mapFrame.scrollBy(mapFrame.offsetWidth / 4, mapFrame.offsetHeight / 4)
	}

	function changePerspective() {
		document.getElementById('div1').style.perspectiveOrigin = perspective
	}

	function rotate3D() {
		document.getElementById('div2').style.transform = `rotateX(${xRotation}deg) rotateZ(${zRotation}deg)`
	}
</script>

<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class="map-frame">
	<div id="guy" class="guy" />
	<div
		id="div1"
		class="map-grid"
		style="height: {$mapStore.pixelSize()}px; width: {$mapStore.pixelSize()}px; perspectiveOrigin: {perspective};"
		on:scroll={console.log(document.querySelector('.map-frame').offsetHeight)}
	>
		<div id="div2" class="map-box">
			{#each $mapStore.contents as row, ri}
				<div class="grid-row">
					{#each row as col, ci}
						<div
							class="grid-cell {$mapStore.contents[ri][ci].m ? 'red' : ''}"
							on:click={() => ($mapStore = $mapStore.mark(ri, ci))}
						/>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
<div class="view-control-box">
	<div>X-Perspective: {xPerspective}</div>
	<Slider
		name="X-perspective"
		min="0"
		max="100"
		step="1"
		bind:value={xPerspective}
		func={changePerspective}
		indicator="false"
	/>
	<br />
	<div>Y-Perspective: {yPerspective}</div>
	<Slider
		name="Y-perspective"
		min="0"
		max="100"
		step="1"
		bind:value={yPerspective}
		func={changePerspective}
		indicator="false"
	/>
	<br />
	<div>X-Axis: {xRotation}</div>
	<Slider name="X-axis" min="0" max="89" step="1" bind:value={xRotation} func={rotate3D} indicator="false" />
	<div>Z-Axis: {zRotation}</div>
	<Slider name="Z-axis" min="-180" max="180" step="1" bind:value={zRotation} func={rotate3D} indicator="false" />
	<div class="zoom-indicator">
		Zoom {$mapStore.magnification * 100}%
	</div>
	<div class="zoom-buttons">
		<button on:click={() => zoomMap('in')}>+</button>
		<button on:click={() => zoomMap('out')}>-</button>
	</div>
</div>

<style>
	#div2 {
		position: absolute;
		background-color: var(--sec-color-trans);
	}
	.guy {
		position: relative;
		height: 100px;
		width: 50px;
		background-color: gray;
		top: 600;
		left: 900;
		z-index: 2;
	}
	.red {
		background-color: red;
	}
	.map-frame {
		align-items: center;
		background-color: black;
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
		background-color: black;
		background-size: cover;
		background-repeat: no-repeat;
		perspective: 200px; /* this is where the 3d lives */
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
	.view-control-box {
		bottom: 20px;
		position: fixed;
		right: 30px;
	}
	/* .zoom-indicator {
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
	} */
</style>
