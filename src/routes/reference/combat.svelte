<script>
import RefPage from '../../components/views/reference/RefPage.svelte'
import Combat from '../../components/rules/Combat'
import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<RefPage chapter={Combat}/>
<NavBar links={{back: '/reference/properties', next: '/reference/maneuvers'}}/>