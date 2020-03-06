<script>
import NavBar from '../../components/views/controls/NavBar.svelte'
import creatorStore from '../../stores/creatorStore'
</script>


<slot />
<NavBar store={$creatorStore}/>