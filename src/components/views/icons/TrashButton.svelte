<script>
	export let args
	export let deleteFunction
</script>


<button class='btn-box trash-btn crimson-btn' on:click={_ => deleteFunction(args)}>
	<div class='btn-icon'>X</div>
</button>


<style>
	.trash-btn {
		height: var(--square);
		width: var(--square);
	}
</style>