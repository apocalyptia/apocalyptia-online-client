<script>
import BodyLocations from '../ui/BodyLocations.svelte'
import { character } from '../../../stores/characterStore'
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Health
	</summary>
	<BodyLocations {character} />
</details>