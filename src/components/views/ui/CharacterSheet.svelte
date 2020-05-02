<script>
import Description from '../sheet/Description.svelte'
import Traits from '../sheet/Traits.svelte'
import Skills from '../sheet/Skills.svelte'
import Properties from '../sheet/Properties.svelte'
import Health from '../sheet/Health.svelte'
import Abilities from '../sheet/Abilities.svelte'
import Gear from '../sheet/Gear.svelte'

export let character
</script>


<div class="character-sheet">
	<Description {character} />
	<Traits {character} />
	<Skills {character} />
	<Properties {character} />
	<Health {character} />
	<Abilities {character} />
	<Gear {character} />
</div>