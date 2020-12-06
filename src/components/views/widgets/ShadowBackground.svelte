<script>
    import { fade } from 'svelte/transition'

    export let active = false
</script>


<div transition:fade class='{active ? "shadow" : "invisible"}' />


<style>
    .shadow {
		background: rgba(0, 0, 0, .66);
		left: 0;
		position: absolute;
		top: 0;
		z-index: 10;
        bottom: 0;
        right: 0;
	}
	.invisible {
		display: none;
	}
</style>