<script>
	export let func, face
</script>


<button class='btn-box square-btn' on:click={func}>
	<div class='dice-icon-box'>{face || 6}</div>
</button>


<style>
	.dice-icon-box {
		font-size: var(--s200);
		padding-top: var(--s25);
	}
</style>