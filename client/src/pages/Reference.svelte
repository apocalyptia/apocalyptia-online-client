<script>
	import { router } from '../routes'
	import RefCombat from '../components/reference/RefCombat.svelte'
	import RefManeuvers from '../components/reference/RefManeuvers.svelte'
	import RefSituations from '../components/reference/RefSituations.svelte'
</script>

<div class='menu-page'>
	<button on:click={router.RefCombat}>Combat</button>
	<button on:click={router.RefManeuvers}>Maneuvers</button>
	<button on:click={router.RefSituations}>Situations</button>
</div>
