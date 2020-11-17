<script>
	import TitleBar from 'views/widgets/TitleBar.svelte'
</script>


<main>
	<TitleBar />
	<div class='display-window'>
		<slot />
	</div>
</main>


<style>
	::-webkit-scrollbar {
		display: none;
	}
	main {
		display: flex;
		justify-content: space-around;
	}
	.display-window {
		height: calc(100vh - var(--s300));
		overflow: scroll;
		position: absolute;
		scrollbar-width: none;
		top: var(--s300);
		margin: 0 auto;
	}

	/* TINY */
	@media only screen and (max-width: 400px) {
		.display-window {
			width: 100vw;
		}
	}

	/* MOBILE */
	@media only screen and (min-width: 400px) and (max-width: 650px) {
		.display-window {
			width: 80vw;
		}
	}

	/* DESKTOP */
	@media only screen and (min-width: 650px) {
		.display-window {
			width: 50vw;
		}
	}
</style>