<script>
import BodyLocations from '../ui/BodyLocations.svelte'

export let character
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Health
	</summary>
	<BodyLocations {character} />
</details>