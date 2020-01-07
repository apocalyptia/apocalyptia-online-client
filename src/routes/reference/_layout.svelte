<script>
	import { fade } from 'svelte/transition'
	import RefNavBar from '../../components/ui/reference/RefNavBar.svelte'
</script>


<div class='page-container' in:fade>
	<slot />
</div>
<RefNavBar />