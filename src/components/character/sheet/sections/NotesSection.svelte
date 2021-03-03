<script>
	import characterStore from 'stores/characterStore.js'

	export let mode = 'edit'
</script>


{#if mode == 'readonly'}
	<div class='sheet-notes-block'>{$characterStore.meta.notes}</div>
{:else}
	<textarea class='sheet-notes-block' wrap='soft' bind:value={$characterStore.meta.notes} />
{/if}


<style>
	.sheet-notes-block {
		color: var(--pri-color);
		height: var(--s1000);
		overflow: auto;
		padding: var(--std-padding);
		resize: none;
		text-align: left;
		width: 100%;
	}
</style>