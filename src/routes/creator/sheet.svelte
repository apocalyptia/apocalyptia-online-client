<script>
import { character } from '../../stores/characterStore'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'

$character.completed = true
</script>


<CharacterSheet/>
<NavBar links={{back: '/creator/gear', next: '/'}}/>