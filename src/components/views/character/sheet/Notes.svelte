<script>
	import { character } from 'stores/characterStore.js'

	export let mode
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Notes
	</summary>
	<div class='sheet-card'>
		{#if mode == 'edit'}
			<textarea class='sheet-notes-block' wrap='soft' bind:value={$character.meta.notes} />
		{:else}
			<div class='sheet-notes-block'>{$character.meta.notes}</div>
		{/if}
	</div>
</details>


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