<script>
import Description from '../sheet/Description.svelte'
import Traits from '../sheet/Traits.svelte'
import Skills from '../sheet/Skills.svelte'
import Properties from '../sheet/Properties.svelte'
import Health from '../sheet/Health.svelte'
import Abilities from '../sheet/Abilities.svelte'
import Gear from '../sheet/Gear.svelte'
import Notes from '../sheet/Notes.svelte'

export let readonly = false
</script>


<div class="character-sheet">
	<Description />
	<Traits />
	<Skills />
	<Properties {readonly} />
	<Health {readonly} />
	<Abilities />
	<Gear {readonly} />
	<Notes />
</div>