<script>
	import NavButtonHome from '/src/components/buttons/NavButtonHome.svelte'
	import NavButtonNext from '/src/components/buttons/NavButtonNext.svelte'
	import NavButtonPrevious from '/src/components/buttons/NavButtonPrevious.svelte'
</script>

<div class="nav-bar">
	<NavButtonPrevious />
	<NavButtonHome />
	<NavButtonNext />
</div>

<style>
	.nav-bar {
		bottom: 2px;
		display: flex;
		height: var(--square);
		position: absolute;
		width: 100vw;
		z-index: 6;
	}
</style>
