<script>
	import TitleBar from '../views/widgets/TitleBar.svelte'
	import { version } from '../main'
</script>


<main>
	<TitleBar {version} />
	<div class='display-window'>
		<div class='page-container'>
			<slot/>
		</div>
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
	.page-container {
		overflow: scroll;
		padding: var(--s100);
		scrollbar-width: none;
	}
</style>