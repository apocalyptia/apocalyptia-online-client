<script>
import NavBar from '../../components/views/controls/NavBar.svelte'
import referenceStore from '../../stores/referenceStore'
</script>


<slot />
<NavBar routed={true} store={$referenceStore}/>