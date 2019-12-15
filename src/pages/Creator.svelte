<script>
	import router from '../routes'
	import BackNextButtons from '../layout/BackNextButtons.svelte'

	import Description from '../components/creator/Description.svelte'
	import Traits from '../components/creator/Traits.svelte'
	import Skills from '../components/creator/Skills.svelte'
	import Properties from '../components/creator/Properties.svelte'
	import Abilities from '../components/creator/Abilities.svelte'
	import Gear from '../components/creator/Gear.svelte'

	let step = 0
	const options = [ Skills, Description, Traits, Skills, Properties, Abilities, Gear ]
	let selected = options[step]

	function nav(event) {
		step = event.detail.number
		if (step == options.length || step < 0) { router.Home() }
		else { selected = options[step] }
	}
</script>

<div>
	<svelte:component this={selected}/>
</div>
<BackNextButtons {step} on:message={nav} />

<style>
	div {
		padding: 20px;
		width: calc(100vw - 40px);
	}
</style>
