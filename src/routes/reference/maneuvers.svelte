<script>
import RefPage from '../../components/views/reference/RefPage.svelte'
import Maneuvers from '../../components/rules/Maneuvers'
import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<RefPage chapter={Maneuvers}/>
<NavBar links={{back: '/reference/combat', next: '/reference/status'}}/>