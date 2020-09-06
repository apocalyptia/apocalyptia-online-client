<script>
	import BodyParts from 'src/components/views/character/BodyParts.svelte'
	import { character } from 'src/stores/characterStore'

	export let readonly = false
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>
		Health
	</summary>
	<BodyParts {character} {readonly} />
</details>