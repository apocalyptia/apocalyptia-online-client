<script>
	import router from '../routes'
	import Navigator from '../functions/Navigator'
	import NavButtons from '../layout/NavButtons.svelte'
	import RefList from '../layout/RefList.svelte'
	import { Combat } from '../rules/Combat'
	import { Maneuvers } from '../rules/Maneuvers'
	import { Situations } from '../rules/Situations'

	let screen = {
		step: 0,
		options: [
			{ name: `Combat`, page: Combat, link: router.RefCombat },
			{ name: `Maneuvers`, page: Maneuvers, link: router.RefManeuvers },
			{ name: `Situations`, page: Situations, link: router.RefSituations }
		]
	}
	screen.selected = screen.options[screen.step]

	function nav(event) {
		screen = Navigator(event, screen)
	}
</script>

<div class='ref-page'>
	{#each screen.options as option}
		<button on:click={option.link}>{option.name}</button>
	{/each}
</div>
<NavButtons {screen} on:message={(event) => nav(event, screen)} />