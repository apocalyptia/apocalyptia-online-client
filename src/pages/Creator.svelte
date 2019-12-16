<script>
	import router from '../routes'
	import Navigator from '../functions/Navigator'
	import NavButtons from '../layout/NavButtons.svelte'

	import Description from '../components/creator/Description.svelte'
	import Traits from '../components/creator/Traits.svelte'
	import Skills from '../components/creator/Skills.svelte'
	import Properties from '../components/creator/Properties.svelte'
	import Abilities from '../components/creator/Abilities.svelte'
	import Gear from '../components/creator/Gear.svelte'

	let screen = {
		step: 0,
		options: [ Description, Traits, Skills, Properties, Abilities, Gear ]
	}
	screen.selected = screen.options[screen.step]

	function nav(event, screen) {
		screen = Navigator(event, screen)
	}
</script>

<div>
	<svelte:component this={screen.selected}/>
</div>
<NavButtons {screen} on:message={(event) => nav(event, screen)} />

<style>
	div {
		padding: 20px;
		width: calc(100vw - 40px);
	}
</style>
