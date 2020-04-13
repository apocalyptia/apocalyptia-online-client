<script>
import RefPage from '../../components/views/reference/RefPage.svelte'
import Complications from '../../components/rules/Complications'
import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<RefPage chapter={Complications}/>
<NavBar links={{back: '/reference/status', next: '/reference/needs'}}/>