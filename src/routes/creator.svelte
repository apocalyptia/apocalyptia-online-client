<script>
	import NavButtons from '../components/ui/NavButtons.svelte'
	import Description from '../components/creator/Description.svelte'
	import Traits from '../components/creator/Traits.svelte'
	import Skills from '../components/creator/Skills.svelte'
	import Properties from '../components/creator/Properties.svelte'
	import Abilities from '../components/creator/Abilities.svelte'
	import Gear from '../components/creator/Gear.svelte'

	let options = [
		{ name: 'Description', content: Description },
		{ name: 'Traits', content: Traits },
		{ name: 'Skills', content: Skills },
		{ name: 'Properties', content: Properties },
		{ name: 'Abilities', content: Abilities },
		{ name: 'Gear', content: Gear }
	]

	let selected = Description

	const handleNavigation = event => selected = event.detail.selection
</script>

<div class='page-container'>
	<svelte:component this={selected}/>
</div>
<NavButtons on:nav={handleNavigation} {options} />