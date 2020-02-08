<script>
	import RoutedNavBar from '../../components/views/ui/RoutedNavBar.svelte'
	import {refToC} from '../../stores'
</script>


<div class='page-container'>
	<slot />
</div>
<RoutedNavBar storeToC={$refToC}/>