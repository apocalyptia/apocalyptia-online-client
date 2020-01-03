<script>
	import { fade } from 'svelte/transition'
	import { router } from '../routes'
	import NavButtons from '../layout/NavButtons.svelte'
	import Description from '../components/creator/CreDescription.svelte'
	import Traits from '../components/creator/CreTraits.svelte'
	import Skills from '../components/creator/CreSkills.svelte'
	import Properties from '../components/creator/CreProperties.svelte'
	import Abilities from '../components/creator/CreAbilities.svelte'
	import Gear from '../components/creator/CreGear.svelte'

	let options = [
		Abilities,
		Description,
		Traits,
		Skills,
		Properties,
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