<script>
	import * as sapper from '@sapper/app'

	export let options
	export let root = '/'
	export let skip = false

	const navigate = (option) => {
		sapper.goto(`${root}/${option.toLowerCase()}`)
	}
</script>

<div class='menu-page'>
	{#each options as option, index}
		{#if skip && index}
			<button
				class='display-button'
				on:click|preventDefault={(event) => navigate(option)}
			>
				{option}
			</button>
		{/if}
	{/each}
</div>

<style>
	.menu-page {
		margin-bottom: calc(3rem + 5vh);
	}
</style>