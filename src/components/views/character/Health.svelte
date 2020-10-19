<script>
	import BodyParts from './BodyParts.svelte'
	import { character } from 'stores/characterStore.js'

	export let mode
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Health
	</summary>
	<div class='sheet-card'>
		<BodyParts {character} {mode} />
	</div>
</details>