<script>
	import ViewScreen from './layout/ViewScreen.svelte'
	import TitleBar from './layout/TitleBar.svelte'
	import { Route, Router } from 'svelte-routing'
	import Home from './pages/Home.svelte'
	import Creator from './pages/Creator.svelte'
	import Reference from './pages/Reference.svelte'
	// import RefDice from './components/reference/RefDice.svelte'
	// import RefTraits from './components/reference/RefTraits.svelte'
	// import RefSkills from './components/reference/RefSkills.svelte'
	// import RefCombat from './components/reference/RefCombat.svelte'
	// import RefManeuvers from './components/reference/RefManeuvers.svelte'
	// import RefSituations from './components/reference/RefSituations.svelte'
	// import RefAbilities from './components/reference/RefAbilities.svelte'
	// import RefGear from './components/reference/RefGear.svelte'
</script>

<ViewScreen>
	<TitleBar />
	<div class='display-window'>
		<Router>
			<Route path='/' component='{Home}' />
			<Route path='/creator' component='{Creator}' />
			<Route path='/reference' component='{Reference}' />
			<!-- <Route path='/reference/dice' component='{RefDice}' />
			<Route path='/reference/traits' component='{RefTraits}' />
			<Route path='/reference/skills' component='{RefSkills}' />
			<Route path='/reference/combat' component='{RefCombat}' />
			<Route path='/reference/maneuvers' component='{RefManeuvers}' />
			<Route path='/reference/situations' component='{RefSituations}' />
			<Route path='/reference/abilities' component='{RefAbilities}' />
			<Route path='/reference/gear' component='{RefGear}' /> -->
		</Router>
	</div>
</ViewScreen>

<style>
	.display-window {
		position: absolute;
		top: 3rem;
		flex-wrap: nowrap;
		flex-direction: column;
		height: calc(100vh - 3rem);
		text-align: center;
		width: 100vw;
	}
</style>