<script>
export let name, value, min, max
</script>


<div class='range-block'>
	<input type='range' {name} {min} {max} bind:value={value} on:input>
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
.range-block {
	display: block;
	width: 100%;
}
.range-indicator {
	display: flex;
	flex-wrap: nowrap;
	margin: auto;
	text-align: center;
	width: 95%;
}
.range-number {
	width: calc(100% / var(--columns));
}
</style>