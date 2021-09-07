<script>
	export let saveFunc, deleteFunc
</script>


<div class="btn-row">
	<a href="/">
		<button class="small-cntr-btn" on:click={deleteFunc}> Delete </button>
	</a>
	<a href="/">
		<button class="small-cntr-btn" on:click={saveFunc}> Save </button>
	</a>
</div>


<style>
	a {
		text-decoration: none !important;
	}
	button {
		height: var(--square);
		width: 30vw;
	}
</style>
