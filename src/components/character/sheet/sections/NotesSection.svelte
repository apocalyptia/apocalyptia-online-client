<script>
	import characterStore from '/src/stores/characterStore.js'
</script>

<textarea class='sheet-notes-block' wrap='soft' bind:value={$characterStore.meta.notes} />

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
