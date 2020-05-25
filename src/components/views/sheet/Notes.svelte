<script>
import { character } from '../../../stores/characterStore'
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Notes
	</summary>
	<div class='sheet-notes-block'>
		<textarea wrap='soft' placeholder='Notes' bind:value={$character.notes} />
	</div>
</details>


<style>
	textarea {
		background-color: rgba(15, 30, 15, 1);
		border: 1px solid lime;
		color: lime;
		height: var(--s1000);
		resize: none;
		width: 100%;
	}
</style>