<script>
	import ViewScreen from '../components/views/ui/ViewScreen.svelte'
	import TitleBar from '../components/views/ui/TitleBar.svelte'
</script>


<main>
	<ViewScreen>
		<TitleBar />
		<div class='display-window'>
			<slot />
		</div>
	</ViewScreen>
</main>


<style>
	.display-window {
		position: absolute;
		top: 3rem;
		flex-wrap: nowrap;
		flex-direction: column;
		height: calc(100vh - 6rem);
		padding-bottom: 3rem;
		text-align: center;
		width: 100%;
	}
</style>