<script>
	import NavButtonHome from '/src/components/buttons/NavButtonHome.svelte'
	import NavButtonNext from '/src/components/buttons/NavButtonNext.svelte'
	import NavButtonPrevious from '/src/components/buttons/NavButtonPrevious.svelte'
</script>


<div class='nav-bar'>
	<NavButtonPrevious />
	<NavButtonHome />
	<NavButtonNext />
</div>


<style>
	.nav-bar {
		display: flex;
		width: 100vw;
		position: absolute;
		bottom: 0;
		z-index: 6;
	}
</style>