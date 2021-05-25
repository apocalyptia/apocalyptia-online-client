<script>
	import Capitalize from '/src/utils/text/Capitalize.js'
	import rulesStore from '/src/stores/rulesStore.js'
	import { onMount } from 'svelte'

	onMount(async () => {
		if ($rulesStore === undefined) {
			await getRules().then(res => $rulesStore.list = res)
			console.log('rulesStore.list = ', $rulesStore.list)
		}
	})
</script>


<div class='page-body'>
	{#if $rulesStore === undefined}
		<p>Loading...</p>
	{:else}
		{#each Object.keys($rulesStore.list) as chapter}
			<div class='manual-btn'>
				<a href={`/manual/${chapter}`} class='link-btn'>
					{Capitalize(chapter)}
				</a>
			</div>
		{/each}
	{/if}
</div>


<style>
	.manual-btn {
		margin-bottom: var(--std-margin);
	}
</style>