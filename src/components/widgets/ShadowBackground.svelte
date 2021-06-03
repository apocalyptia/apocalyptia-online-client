<script>
	import { fade } from 'svelte/transition'

	export let active = false

	function toggleActive() {
		active = !active
	}
</script>

<div class={active ? 'shadow' : 'invisible'} transition:fade on:click={toggleActive} />

<style>
	.shadow {
		background: rgba(0, 0, 0, 0.333);
		height: 100vh;
		left: 0;
		position: absolute;
		top: 0;
		width: 100vw;
		z-index: 10;
	}
	.invisible {
		display: none;
	}
</style>
