<script>
	import { router } from '../routes'

	import Description from '../components/creator/CreDescription.svelte'
	import Traits from '../components/creator/CreTraits.svelte'
	import Skills from '../components/creator/CreSkills.svelte'
	import Properties from '../components/creator/CreProperties.svelte'
	import Abilities from '../components/creator/CreAbilities.svelte'
	import Gear from '../components/creator/CreGear.svelte'


	let screen = {
		step: 0,
		options: [ Traits, Abilities, Description, Traits, Skills, Properties, Abilities, Gear ]
	}
	screen.selected = screen.options[screen.step]

	function back () {
		--screen.step
		if (screen.step == screen.options.length || screen.step < 0) { router.Home() }
		else { screen.selected = screen.options[screen.step] }
	}

	function home () { router.Home() }

	function next() { 
		++screen.step
		if (screen.step == screen.options.length || screen.step < 0) { router.Home() }
		else { screen.selected = screen.options[screen.step] }
	}
</script>

<div class='creator-page'>
	<svelte:component this={screen.selected}/>
	<div class='nav-buttons'>
		<button class='nav-button' on:click={back}>Back</button>
		<button class='nav-button' on:click={home}>Home</button>
		<button class='nav-button' on:click={next}>Next</button>
	</div>
</div>

<style>
	.creator-page {
		padding: 20px;
		width: calc(100vw - 40px);
	}
	.nav-buttons {
		display: flex;
		flex-direction: row;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 50px;
		width: 100vw;
	}
	.nav-button {
		border: 1px solid;
		width: 50vw;
	}
</style>
