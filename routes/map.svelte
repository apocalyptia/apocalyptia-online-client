<script>
	import mapStore from '/src/stores/mapStore.js'
	import * as THREE from 'three'
	import { OrbitControls } from '/src/utils/threejs/OrbitControls.js'
	import { onMount } from 'svelte'

	let canvas, scene, camera, renderer, controls

	function init() {
		scene = new THREE.Scene()
		camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000)
		camera.position.set(-900,-200,-900)
		renderer = new THREE.WebGLRenderer({
			antialias:true,
			alpha: true,
			canvas
		})
		renderer.setSize(window.innerWidth, window.innerHeight)
		scene.background = new THREE.CubeTextureLoader()
									.setPath("textures/skybox/arid/")
									.load(["lf.jpg", "rt.jpg", "up.jpg", "dn.jpg", "ft.jpg", "bk.jpg"])

		controls = new OrbitControls(camera, canvas)
		controls.enabled = true
		controls.minDistance = 700
		controls.maxDistance = 1500
		animate()
	}

	function animate() {
		renderer.render(scene, camera)
		requestAnimationFrame(animate)
	}

	onMount(() => {
		init()
		$mapStore = $mapStore.fillContents()
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Map</title>
</svelte:head>
<div class='page-body'>
	<canvas bind:this={canvas} />
</div>


<style>
	.page-body {
		padding: 0;
	}
	canvas {
		opacity: 0.75;
	}
</style>