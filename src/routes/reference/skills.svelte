<script>
import RefPage from '../../components/views/reference/RefPage.svelte'
import Skills from '../../components/rules/skills/Skills'
import NavBar from '../../components/views/controls/NavBar.svelte'

Skills.list = Skills.list.sort((a, b) => (a.name > b.name))
</script>


<RefPage chapter={Skills}/>
<NavBar links={{back: '/reference/properties', next: '/reference/status'}}/>