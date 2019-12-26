<script>
	import { fade } from 'svelte/transition'
	import { router } from '../routes'
	import RefDice from '../components/reference/RefDice.svelte'
	import RefCombat from '../components/reference/RefCombat.svelte'
	import RefManeuvers from '../components/reference/RefManeuvers.svelte'
	import RefSituations from '../components/reference/RefSituations.svelte'
</script>

<div class='display-page' in:fade>
	<button class='diplay-button' on:click={router.RefDice}>
		Dice
	</button>
	<button class='diplay-button' on:click={router.RefCombat}>
		Combat
	</button>
	<button class='diplay-button' on:click={router.RefManeuvers}>
		Maneuvers
	</button>
	<button class='diplay-button' on:click={router.RefSituations}>
		Situations
	</button>
	<button class='ref-back' on:click={router.Home}>
		Back
	</button>
</div>
