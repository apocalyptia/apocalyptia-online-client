<script>
	import BodyParts from 'components/character/BodyParts.svelte'

	export let mode = 'edit'
</script>


<section>
	<details class='sheet-details'>
		<summary class='sheet-card-title'>
			Health
		</summary>
		<div class='sheet-card'>
			<BodyParts {mode} />
		</div>
	</details>
</section>