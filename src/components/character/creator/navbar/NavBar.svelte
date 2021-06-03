<script>
	import NavButtonHome from '/src/components/character/creator/navbar/NavButtonHome.svelte'
	import NavButtonNext from '/src/components/character/creator/navbar/NavButtonNext.svelte'
	import NavButtonPrevious from '/src/components/character/creator/navbar/NavButtonPrevious.svelte'
</script>


<div class='nav-bar'>
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
