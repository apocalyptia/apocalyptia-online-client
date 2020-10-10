<script>
	import TitleBar from '../views/widgets/TitleBar.svelte'
</script>


<main>
	<TitleBar />
	<div class='display-window'>
		<slot/>
	</div>
</main>


<style>
	::-webkit-scrollbar {
		display: none;
	}
	.display-window {
		height: calc(100vh - var(--s300));
		overflow: scroll;
		position: absolute;
		scrollbar-width: none;
		top: var(--s300);
		width: 100vw;
	}
</style>