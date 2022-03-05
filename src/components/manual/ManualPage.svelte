<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
	import searchStore from '$stores/searchStore.js'
	import { onMount } from 'svelte'

	export let list

	onMount(() => {
		$searchStore.list = list
		$searchStore.results = $searchStore.defaultResults()
	})
</script>


<div class="page-body">
	<CenterCard>
		{#if $searchStore.term.length && $searchStore.results.length === 0}
			<p>No search results found.</p>
		{:else}
			{#each $searchStore.results as link}
				<div class="manual-btn">
					<a href={link.url} class="link-btn">
						{link.name}
					</a>
				</div>
			{/each}
		{/if}
	</CenterCard>
</div>