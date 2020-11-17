<script>
	export let args, deleteFunction

	// const callDeleteFunction = _ => deleteFunction(args)
</script>


<button class='btn-box trash-btn' on:click={_ => deleteFunction(args)}>
	<div class='btn-icon'>&#10006;</div>
</button>


<style>
	.trash-btn {
		-webkit-text-fill-color: var(--sec-color);
		background-color: crimson;
		border: 1px solid var(--sec-color);
		color: var(--sec-color);
		font-size: var(--s150);
		font-weight: bold;
		height: var(--s300);
		min-height: var(--s300);
		max-height: var(--s300);
		width: var(--s300);
		min-width: var(--s300);
		max-width: var(--s300);
	}
	.trash-btn:hover {
		-webkit-text-fill-color: crimson;
		background-color: var(--sec-color);
		border: 1px solid crimson;
		box-shadow: 0 0 15px 5px rgba(220, 20, 60, 0.7);
		color: crimson;
	}
</style>