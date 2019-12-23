<script>
	import { router } from '../routes'
	import RefCombat from '../components/reference/RefCombat.svelte'
	import RefManeuvers from '../components/reference/RefManeuvers.svelte'
	import RefSituations from '../components/reference/RefSituations.svelte'
</script>

<div class='display-page'>
	<button class='diplay-button' on:click={router.RefCombat}>
		Combat
	</button>
	<button class='diplay-button' on:click={router.RefManeuvers}>
		Maneuvers
	</button>
	<button class='diplay-button' on:click={router.RefSituations}>
		Situations
	</button>
</div>