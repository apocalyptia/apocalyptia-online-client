<script>
	export let name, value, min, max
</script>


<div class='range-block'>
	<input type='range' {name} {min} {max} bind:value={value} on:input>
	<div class='range-indicator'>
		{#if min}
			{#each Array(max) as _, i}
				<span class='range-number'>{i+1}</span>
			{/each}
		{:else}
			{#each Array(max+1) as _, i}
				<span class='range-number'>{i}</span>
			{/each}
		{/if}
	</div>
</div>


<style>
	.range-block {
		display: block;
		margin: auto;
		width: 95%;
	}
	input[type="range"] {
		-moz-appearance: none;
		-webkit-appearance: none;
		margin: var(--s100) auto;
		height: var(--s100);
		width: 100%;
	}
	input[type="range"]::-moz-range-thumb {
		-moz-appearance: none;
		background-color: lime;
		border-radius: var(--radius);
		border: 1px solid rgba(15, 30, 15, 1);
		height: var(--s200);
		width: var(--s200);
	}
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: lime;
		border-radius: var(--radius);
		border: 1px solid rgba(15, 30, 15, 1);
		height: var(--s200);
		width: var(--s200);
	}
	input[type="range"]:hover::-moz-range-thumb {
		-moz-appearance: none;
		background: rgba(15, 30, 15, 1);
		border: 1px solid lime;
	}
	input[type="range"]:hover::-webkit-slider-thumb {
		-webkit-appearance: none;
		background: rgba(15, 30, 15, 1);
		border: 1px solid lime;
	}
	.range-indicator {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin: auto;
		text-align: center;
		width: 100%;
	}
</style>