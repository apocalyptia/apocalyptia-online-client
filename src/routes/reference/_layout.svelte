<script>
	import { fade } from 'svelte/transition'
	import RoutedNavBar from '../../components/ui/RoutedNavBar.svelte'
	import {refToC} from '../../stores'
</script>


<div class='page-container' in:fade>
	<slot />
</div>
<RoutedNavBar storeToC={$refToC}/>