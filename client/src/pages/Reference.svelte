<script>
	import { fade } from 'svelte/transition'
	import { router } from '../routes'
	import RefMenu from '../components/reference/RefMenu.svelte'
	// import RefDice from '../components/reference/RefDice.svelte'
	// import RefTraits from '../components/reference/RefTraits.svelte'
	// import RefSkills from '../components/reference/RefSkills.svelte'
	// import RefCombat from '../components/reference/RefCombat.svelte'
	// import RefManeuvers from '../components/reference/RefManeuvers.svelte'
	// import RefSituations from '../components/reference/RefSituations.svelte'
	// import RefAbilities from '../components/reference/RefAbilities.svelte'
	// import RefGear from '../components/reference/RefGear.svelte'
</script>

<div class='display-page' in:fade>
	<RefMenu />
	<!-- <button class='diplay-button' on:click={router.RefDice}>Dice</button>
	<button class='diplay-button' on:click={router.RefTraits}>Traits</button>
	<button class='diplay-button' on:click={router.RefSkills}>Skills</button>
	<button class='diplay-button' on:click={router.RefCombat}>Combat</button>
	<button class='diplay-button' on:click={router.RefManeuvers}>Maneuvers</button>
	<button class='diplay-button' on:click={router.RefSituations}>Situations</button>
	<button class='diplay-button' on:click={router.RefAbilities}>Abilities</button>
	<button class='diplay-button' on:click={router.RefGear}>Gear</button> -->
</div>
<button class='ref-back' on:click={router.Home}>Back</button>