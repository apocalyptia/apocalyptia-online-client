<script>
	import searchStore from '/src/stores/searchStore.js'
	import { onMount } from 'svelte'

	function runSearch() {
		$searchStore.query()
		$searchStore = $searchStore
	}

	function clearSearch() {
		$searchStore.term = ''
		$searchStore.query()
	}

	onMount(() => clearSearch())
</script>


<div class="manual-header-section">
	<div class="search-bar-container">
		<input type="text" class="search-bar" placeholder="Search" bind:value={$searchStore.term} on:keyup={runSearch} />
		<button class="clear-button" on:click={clearSearch}> X </button>
	</div>
</div>


<style>
	.manual-header-section {
		align-items: center;
		background-color: var(--sec-color-trans);
		border: 1px solid var(--pri-color);
		display: flex;
		height: var(--square);
		justify-content: space-around;
		left: 0;
		position: fixed;
		right: 0;
		top: var(--square);
		z-index: 6;
	}
	.search-bar-container {
		display: flex;
		margin: 0 var(--margin);
		width: var(--max-width);
	}
	.search-bar {
		padding: var(--s25) 1ch;
		text-align: left;
		width: 100%;
	}
	.search-bar::placeholder {
		color: var(--sec-color);
	}
	.search-bar:hover::placeholder {
		color: var(--pri-color);
	}
	.clear-button {
		align-items: center;
		display: flex;
		justify-content: space-around;
		right: var(--padding);
		width: var(--input-size);
		z-index: 3;
	}
</style>
