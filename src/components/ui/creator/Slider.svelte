<script>
	export let name
	export let value
	export let min
	export let max
</script>


<div class='range-block'>
	<input type='range' {name} {min} {max} {value} on:input>
	<div class='range-indicator'>
		{#if min}
			{#each Array(max) as _, i}
				<div class='range-number' style='--columns:{max+min-1}'>{i+1}</div>
			{/each}
		{:else}
			{#each Array(max+1) as _, i}
				<div class='range-number' style='--columns:{max+min}'>{i}</div>
			{/each}
		{/if}
	</div>
</div>


<style>
	input[type="range"] {
		border-radius: 3px;
		color: transparent;
		height: calc(2rem + 2px);
		-webkit-appearance: none;
		width: 100%;
	}
	input[type="range"]::-ms-track {
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type="range"]::-moz-range-thumb {
		background: var(--txt-color);
		border-radius: 3px;
		border: 1px solid var(--scr-color);
		height: 2rem;
		width: 2rem;
	}
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		background: var(--txt-color);
		border-radius: 3px;
		border: 1px solid var(--scr-color);
		height: 2rem;
		width: 2rem;
	}
	.range-block {
		display: block;
		width: 100%;
	}
	.range-indicator {
		display: flex;
		flex-wrap: nowrap;
		text-align: center;
		width: 100%;
	}
	.range-number {
		width: calc(100% / var(--columns));
	}
</style>