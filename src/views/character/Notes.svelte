<script>
	import { character } from '../../stores/characterStore'
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>
		Notes
	</summary>
	<div class='sheet-notes-block'>
		<textarea wrap='soft' placeholder='Notes' bind:value={$character.meta.notes} />
	</div>
</details>


<style>
	.sheet-notes-block {
		padding-left: var(--s200);
		padding-right: var(--s200);
		padding-bottom: var(--s200);
	}
	textarea {
		background-color: rgba(15, 30, 15, 1);
		border: 1px solid lime;
		color: lime;
		height: var(--s1000);
		resize: none;
		width: 99%;
	}
</style>