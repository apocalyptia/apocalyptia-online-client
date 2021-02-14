<script>
	import BackButton from 'components/buttons/BackButton.svelte'
</script>

<div class="e404">
	<h1>404</h1>
	<p>Page not found.</p>
</div>
<BackButton path={'../'}/>


<style>
	.e404 {
		align-items: center;
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: center;
		width: 100vw;
	}
</style>