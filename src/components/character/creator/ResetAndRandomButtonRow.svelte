<script>
	export let reset = '',
		random
</script>

<div class='btn-row'>
	{#if reset != ''}
		<button class='small-cntr-btn' on:click={reset}>Reset</button>
	{/if}
	<button class='small-cntr-btn' on:click={random}>Random</button>
</div>

<style>
	button {
		height: var(--square);
	}
</style>
