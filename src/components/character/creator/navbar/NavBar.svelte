<script>
	import NavButtonHome from '$components/character/creator/navbar/NavButtonHome.svelte'
	import NavButtonNext from '$components/character/creator/navbar/NavButtonNext.svelte'
	import NavButtonPrevious from '$components/character/creator/navbar/NavButtonPrevious.svelte'
</script>


<div class="nav-bar">
	<NavButtonPrevious />
	<NavButtonHome />
	<NavButtonNext />
</div>


<style>
	.nav-bar {
		bottom: 0;
		display: flex;
		height: var(--square);
		position: absolute;
		width: 100vw;
		z-index: 6;
	}
</style>
