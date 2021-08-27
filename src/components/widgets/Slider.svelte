<script>
	export let name,
		value,
		min = 0,
		max = 100,
		step = 1,
		indicator = false,
		func = null,
		type = null

	value = parseFloat(value)
	min = parseFloat(min)
	max = parseFloat(max)
	step = parseFloat(step)
</script>

<div class="range-block">
	<input type="range" {name} {min} {max} {step} bind:value on:input={func ? func() : ''} />
	{#if indicator === 'true'}
		<div class="range-indicator">
			{#if type === 'trait'}
				{#each Array(max) as _, i}
					<span class="range-number">
						{i % step === 0 ? i + 1 : ''}
					</span>
				{/each}
			{:else if type === 'skill'}
				{#each Array(max + 1) as _, i}
					<span class="range-number">
						{i % step === 0 ? i : ''}
					</span>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	.range-block {
		display: block;
		margin: auto;
		width: 95%;
	}
	input[type='range'] {
		-moz-appearance: none;
		-webkit-appearance: none;
		margin: var(--s100) auto;
		height: var(--s100);
		width: 100%;
	}
	input[type='range']::-moz-range-thumb {
		-moz-appearance: none;
		background-color: var(--pri-color-trans);
		border-radius: var(--radius);
		border: 1px solid var(--sec-color);
		height: var(--input-size);
		width: var(--s100);
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: var(--pri-color-trans);
		border-radius: var(--radius);
		border: 1px solid var(--sec-color);
		height: var(--input-size);
		width: var(--s100);
	}
	input[type='range']:hover::-moz-range-thumb {
		-moz-appearance: none;
		background: var(--sec-color);
		border: 1px solid var(--pri-color);
	}
	input[type='range']:hover::-webkit-slider-thumb {
		-webkit-appearance: none;
		background: var(--sec-color);
		border: 1px solid var(--pri-color);
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
