<script>
import NavBar from '../../components/views/controls/NavBar.svelte'
import Description from '../../components/views/creator/Description.svelte'
import Traits from '../../components/views/creator/Traits.svelte'
import Skills from '../../components/views/creator/Skills.svelte'
import Properties from '../../components/views/creator/Properties.svelte'
import Abilities from '../../components/views/creator/Abilities.svelte'
import Gear from '../../components/views/creator/Gear.svelte'
import Sheet from '../../components/views/creator/Sheet.svelte'

const options = [
	{ name: `Description`, content: Description },
	{ name: `Traits`, content: Traits },
	{ name: `Skills`, content: Skills },
	{ name: `Properties`, content: Properties },
	{ name: `Abilities`, content: Abilities },
	{ name: `Gear`, content: Gear },
	{ name: `Sheet`, content: Sheet},
]

let selected = Abilities
</script>


<svelte:component this={selected}/>
<NavBar on:nav={(event) => selected = event.detail.selection} {options} />