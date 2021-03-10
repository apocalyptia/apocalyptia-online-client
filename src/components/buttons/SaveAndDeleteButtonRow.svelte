<script>
    export let saveFunc, deleteFunc
</script>


<div class='btn-row'>
	<button class='small-cntr-btn' on:click={saveFunc}>
		<a href='/'>Save</a>
	</button>
	<button class='small-cntr-btn' on:click={deleteFunc}>
		<a href='/'>Delete</a>
	</button>
</div>


<style>
	button {
		height: var(--square);
	}
	a {
		height: 100%;
		width: 100%;
	}
</style>