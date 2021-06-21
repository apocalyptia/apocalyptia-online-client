<script>
	import mapStore from '/src/stores/mapStore.js'
	import * as THREE from 'three'
	import { OrbitControls } from '/src/utils/threejs/OrbitControls.js'
	import { onMount } from 'svelte'

	let canvas, scene, camera, renderer, controls

	function init() {
		scene = new THREE.Scene()
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			canvas
		})

		scene.background = new THREE.CubeTextureLoader()
			.setPath('textures/skybox/arid/')
			.load(['lf.jpg', 'rt.jpg', 'up.jpg', 'dn.jpg', 'ft.jpg', 'bk.jpg'])
		camera.position.set(-900, 10, -900)
		renderer.setSize(window.innerWidth, window.innerHeight)
	
		controls = new OrbitControls(camera, canvas)
		controls.enabled = true
		controls.minDistance = 700
		controls.maxDistance = 1500

		const geo = new THREE.PlaneBufferGeometry(20000, 20000, 80, 8)
		const mat = new THREE.MeshBasicMaterial({
			color: 0x008800,
			side: THREE.DoubleSide
		})
		mat.opacity = 0.1
		const plane = new THREE.Mesh(geo, mat)

		plane.rotateX(-Math.PI / 2)
		plane.position.z = 10

		scene.add(plane);

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
