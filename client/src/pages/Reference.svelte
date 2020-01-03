<script>
	import { fade } from 'svelte/transition'
	import { router } from '../routes'
	import NavButtons from '../layout/NavButtons.svelte'
	import RefMenu from '../components/reference/RefMenu.svelte'
	import Dice from '../components/reference/RefDice.svelte'
	import Traits from '../components/reference/RefTraits.svelte'
	import Skills from '../components/reference/RefSkills.svelte'
	import Combat from '../components/reference/RefCombat.svelte'
	import Maneuvers from '../components/reference/RefManeuvers.svelte'
	import Situations from '../components/reference/RefSituations.svelte'
	import Abilities from '../components/reference/RefAbilities.svelte'
	import Gear from '../components/reference/RefGear.svelte'

	let options = [
		RefMenu,
		Dice,
		Traits,
		Skills,
		Combat,
		Maneuvers,
		Situations,
		Abilities,
		Gear
	]
	let selected = options[0]

	const handleNavigation = (event) => selected = event.detail.selection
</script>

<div class='page-container' in:fade>
	<svelte:component this={selected} />
</div>
<NavButtons on:nav={handleNavigation} {options}/>