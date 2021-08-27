<script>
	import { createEventDispatcher } from 'svelte'

	export let chapter

	let searchTerm = ''

	const dispatch = createEventDispatcher()

	function sendEvent() {
		dispatch('search', searchTerm)
	}
</script>


<div class="manual-header-section">
	<div class="rules-name">{chapter}</div>
	<input type="text" class="search-bar" placeholder="Search" bind:value={searchTerm} on:keyup={() => sendEvent(searchTerm)} />
</div>


<style>
	.manual-header-section {
		align-items: center;
		background-color: var(--sec-color-trans);
		border: 1px solid var(--pri-color);
		display: flex;
		height: var(--square);
		justify-content: space-between;
		left: 0;
		padding: 0 1ch;
		position: fixed;
		right: 0;
		top: var(--square);
		z-index: 6;
	}
	.rules-name {
		font-size: var(--s150);
		font-weight: bold;
	}
	.search-bar {
		max-width: 300px;
		padding: var(--s25) 1ch;
		text-align: left;
		width: 50vw;
	}
	.search-bar::placeholder {
		color: var(--sec-color);
	}
	.search-bar:hover::placeholder {
		color: var(--pri-color);
	}
</style>
