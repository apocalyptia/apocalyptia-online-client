<script>
	import Rules from '/src/rules/Rules.js'
	import capitalize from '/src/utils/text/capitalize.js'
	import searchEngine from '/src/utils/searching/searchEngine.js'
	import urlFormat from '/src/utils/text/urlFormat.js'
	import searchStore from '/src/stores/searchStore.js'
	import { onMount } from 'svelte'

	let manualMenuList = []

	function searchRules() {
		manualMenuList = searchEngine($searchStore)
		if (manualMenuList.length === 0) {
			manualMenuList = Object.keys(Rules).map((rule) => {
				return {
					name: capitalize(rule)
				}
			})
		}
	}

	onMount((_) => searchRules($searchStore))
</script>

<div class="manual-header-section">
	<input type="text" class="search-bar" placeholder="Search" bind:value={$searchStore} on:keyup={() => searchRules()} />
</div>
<div class="page-body">
	{#each manualMenuList as link}
		<div class="manual-btn">
			<a href={$searchStore.length ? link.url : urlFormat(`/manual/${link.name}`)} class="link-btn">
				{link.name}
			</a>
		</div>
	{/each}
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
	.search-bar {
		padding: var(--s25) 1ch;
		text-align: left;
		width: 100%;
		max-width: var(--max-width);
	}
	.search-bar::placeholder {
		color: var(--sec-color);
	}
	.search-bar:hover::placeholder {
		color: var(--pri-color);
	}
	.page-body {
		top: calc(var(--square) * 2);
	}
</style>
