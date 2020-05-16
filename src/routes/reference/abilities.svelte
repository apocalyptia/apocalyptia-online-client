<script>
import RefPage from '../../components/views/reference/RefPage.svelte'
import Abilities from '../../components/rules/abilities/Abilities'
import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<RefPage chapter={Abilities}/>
<NavBar links={{back: '/reference/', next: '/reference/combat'}}/>