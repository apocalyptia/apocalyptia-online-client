<script>
	import RoutedNavBar from '../../components/ui/RoutedNavBar.svelte'
	import {refToC} from '../../stores'
</script>


<div class='page-container'>
	<slot />
</div>
<RoutedNavBar storeToC={$refToC}/>