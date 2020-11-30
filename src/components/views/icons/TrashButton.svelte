<script>
	export let args
	export let deleteFunction
</script>


<button class='btn-box trash-btn' on:click={_ => deleteFunction(args)}>
	<div class='btn-icon'>X</div>
</button>


<style>
	.trash-btn {
		-webkit-text-fill-color: var(--sec-color);
		background-color: crimson;
		border: 1px solid var(--sec-color);
		color: var(--sec-color);
		font-size: var(--s150);
		font-weight: bold;
		height: var(--square);
		max-height: var(--square);
		max-width: var(--square);
		min-height: var(--square);
		min-width: var(--square);
		width: var(--square);
	}
	.trash-btn:hover {
		-webkit-text-fill-color: crimson;
		background-color: var(--sec-color);
		border: 1px solid crimson;
		box-shadow: 0 0 15px 5px var(--ter-color-trans);
		color: crimson;
	}
</style>