<script>
import NavBar from '../../components/views/controls/NavBar.svelte'
import { refToC } from '../../stores'
</script>


<slot />
<NavBar routed={true} store={$refToC}/>