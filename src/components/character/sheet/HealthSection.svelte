<script>
	import BodyParts from 'components/character/BodyParts.svelte'

	export let mode = 'edit'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Health
	</summary>
	<div class='sheet-card'>
		<BodyParts {mode} />
	</div>
</details>