<script>
	import manualStore from '../stores/manualStore.js'
	import { onMount } from 'svelte'

	onMount(async _ => {
		await manualStore.getList()
	})
</script>


<div class='page-body'>
	{#if manualStore.loading}
		<p>Loading...</p>
	{:else}
		{#each manualStore.list as chapter}
			<div class='manual-btn'>
				<a href={`/manual/${chapter.name.toLowerCase()}`} class='link-btn'>
					{chapter.name}
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