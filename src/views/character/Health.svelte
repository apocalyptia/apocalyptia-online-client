<script>
	import BodyParts from './BodyParts.svelte'
	import { character } from '../../stores/characterStore'

	export let readonly = false
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>
		Health
	</summary>
	<BodyParts {character} {readonly} />
</details>