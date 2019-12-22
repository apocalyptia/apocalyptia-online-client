<script>
	import ViewScreen from './layout/ViewScreen.svelte'
	import TitleBar from './layout/TitleBar.svelte'
	import { Route, Router } from 'svelte-routing'
	import Home from './pages/Home.svelte'
	import Creator from './pages/Creator.svelte'
	import Reference from './pages/Reference.svelte'
	import RefCombat from './components/reference/RefCombat.svelte'
	import RefManeuvers from './components/reference/RefManeuvers.svelte'
	import RefSituations from './components/reference/RefSituations.svelte'
</script>

<ViewScreen>
	<TitleBar />
	<div class='display-window'>
		<Router>
			<Route path='/' component='{Home}' />
			<Route path='/creator' component='{Creator}' />
			<Route path='/reference' component='{Reference}' />
			<Route path='/reference/combat' component='{RefCombat}' />
			<Route path='/reference/maneuvers' component='{RefManeuvers}' />
			<Route path='/reference/situations' component='{RefSituations}' />
		</Router>
	</div>
</ViewScreen>

<style>
	.display-window {
		height: calc(100vh - 50px);
		position: absolute;
		top: 50px;
		width: 100vw;
	}
</style>