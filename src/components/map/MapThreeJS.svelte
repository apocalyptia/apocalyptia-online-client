<script>
	import * as THREE from 'three'
	import { OrbitControls } from '$utils/threejs/OrbitControls.js'
	import { onMount } from 'svelte'

	let canvas, scene, camera, renderer, controls


	class BasicCharacterControls {

		constructor(params) {
			this._Init(params);
		}

		_Init(params) {
			this._params = params;
			this._move = {
			forward: false,
			backward: false,
			left: false,
			right: false,
			};
			this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
			this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
			this._velocity = new THREE.Vector3(0, 0, 0);

			document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
			document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
		}

		_onKeyDown(event) {
			switch (event.keyCode) {
			case 87: // w
				this._move.forward = true;
				break;
			case 65: // a
				this._move.left = true;
				break;
			case 83: // s
				this._move.backward = true;
				break;
			case 68: // d
				this._move.right = true;
				break;
			case 38: // up
			case 37: // left
			case 40: // down
			case 39: // right
				break;
			}
		}

		_onKeyUp(event) {
			switch(event.keyCode) {
			case 87: // w
				this._move.forward = false;
				break;
			case 65: // a
				this._move.left = false;
				break;
			case 83: // s
				this._move.backward = false;
				break;
			case 68: // d
				this._move.right = false;
				break;
			case 38: // up
			case 37: // left
			case 40: // down
			case 39: // right
				break;
			}
		}

		Update(timeInSeconds) {
			const velocity = this._velocity;
			const frameDecceleration = new THREE.Vector3(
				velocity.x * this._decceleration.x,
				velocity.y * this._decceleration.y,
				velocity.z * this._decceleration.z
			);
			frameDecceleration.multiplyScalar(timeInSeconds);
			frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
				Math.abs(frameDecceleration.z), Math.abs(velocity.z));

			velocity.add(frameDecceleration);

			const controlObject = this._params.target;
			const _Q = new THREE.Quaternion();
			const _A = new THREE.Vector3();
			const _R = controlObject.quaternion.clone();

			if (this._move.forward) {
			velocity.z += this._acceleration.z * timeInSeconds;
			}
			if (this._move.backward) {
			velocity.z -= this._acceleration.z * timeInSeconds;
			}
			if (this._move.left) {
			_A.set(0, 1, 0);
			_Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
			_R.multiply(_Q);
			}
			if (this._move.right) {
			_A.set(0, 1, 0);
			_Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
			_R.multiply(_Q);
			}

			controlObject.quaternion.copy(_R);

			const oldPosition = new THREE.Vector3();
			oldPosition.copy(controlObject.position);

			const forward = new THREE.Vector3(0, 0, 1);
			forward.applyQuaternion(controlObject.quaternion);
			forward.normalize();

			const sideways = new THREE.Vector3(1, 0, 0);
			sideways.applyQuaternion(controlObject.quaternion);
			sideways.normalize();

			sideways.multiplyScalar(velocity.x * timeInSeconds);
			forward.multiplyScalar(velocity.z * timeInSeconds);

			controlObject.position.add(forward);
			controlObject.position.add(sideways);

			oldPosition.copy(controlObject.position);
		}

	}


	function init() {

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas })
		renderer.shadowMap.enabled = true
		renderer.shadowMap.type = THREE.PCFSoftShadowMap
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)

		scene = new THREE.Scene()

		const loader = new THREE.CubeTextureLoader()
		loader.setPath('/textures/skybox/arid/')
		const texture = loader.load(['lf.jpg', 'rt.jpg', 'up.jpg', 'dn.jpg', 'ft.jpg', 'bk.jpg'])
		scene.background = texture

		let light = new THREE.DirectionalLight(0xFFFFFF)
		light.position.set(100,100,100)
		light.target.position.set(0,0,0)
		light.castShadow = true
		light.shadow.bias = -0.001
		light.shadow.mapSize.width = 2048
		light.shadow.mapSize.height = 2048
		light.shadow.camera.near = 0.5
		light.shadow.camera.far = 500
		light.shadow.camera.left = 100
		light.shadow.camera.right = -100
		light.shadow.camera.top = 100
		light.shadow.camera.bottom = -100
		scene.add(light)
		light = new THREE.AmbientLight(0xFFFFFF, 4.0)
    	scene.add(light)

		const fov = 60
		const aspect = window.innerWidth / window.innerHeight
		const near = 1.0
		const far = 1000.0
		camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
		camera.position.set(75, 20, 0)
		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}, false)
		
		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry(100, 100, 10, 10),
			new THREE.MeshStandardMaterial({ color: 0x202020 })
		)
		plane.castShadow = false
		plane.receiveShadow = true
		plane.rotation.x = -Math.PI / 2
		scene.add(plane)

		controls = new OrbitControls(camera, canvas)
		controls.target.set(0, 20, 0)
		controls.update()

		const mixers = []
		let previousRAF = null

		// loadAnimatedModel(scene, camera, mixers)

		animate()

	}

	function loadAnimatedModel(scene, camera, mixers) {
		const loader = new THREE.FBXLoader();
		loader.setPath('./resources/zombie/');
		loader.load('mremireh_o_desbiens.fbx', (fbx) => {
		fbx.scale.setScalar(0.1);
		fbx.traverse(c => {
			c.castShadow = true;
		});

		const params = {
			target: fbx,
			camera: camera,
		}
		controls = new BasicCharacterControls(params);

		const anim = new THREE.FBXLoader();
		anim.setPath('./resources/zombie/');
		anim.load('walk.fbx', (anim) => {
			const m = new THREE.AnimationMixer(fbx);
			mixers.push(m);
			const idle = m.clipAction(anim.animations[0]);
			idle.play();
		});
			scene.add(fbx);
		});
	}

	function animate() {
		requestAnimationFrame(() => {
			renderer.render(scene, camera)
			animate()
		})
	}

	onMount(() => init())
</script>


<canvas bind:this={canvas} />


<style>
	canvas {
		opacity: 0.5;
		width: 100vw !important;
	}
</style>
