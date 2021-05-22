<script>
	import Capitalize from '/src/utils/text/Capitalize.js'
	import rulesStore from '/src/stores/rulesStore.js'
</script>


<div class='page-body'>
	{#if $rulesStore.loading}
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