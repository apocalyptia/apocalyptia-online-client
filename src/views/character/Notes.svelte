<script>
	import { character } from '../../stores/characterStore'

	export let mode
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Notes
	</summary>
	<div class='sheet-card'>
		<textarea class='sheet-notes-block' wrap='soft' bind:value={$character.meta.notes} />
	</div>
</details>


<style>
	.sheet-notes-block {
		color: lime;
		font-family: var(--global-font);
		height: 100%;
		height: var(--s1000);
		overflow: auto;
		padding: var(--s100);
		resize: none;
		text-align: left;
		width: calc(100% - var(--s200));
	}
</style>