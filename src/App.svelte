<script>
	import { Route, Router } from 'svelte-routing'
	import ViewScreen from './layout/ViewScreen.svelte'
	import TitleBar from './layout/TitleBar.svelte'
	import Home from './pages/Home.svelte'
	import Creator from './pages/Creator.svelte'
	import Rules from './pages/Rules.svelte'
</script>

<ViewScreen>
	<TitleBar />
	<Router>
		<Route path='/' component='{Home}' />
		<Route path='/creator' component='{Creator}' />
		<Route path='/rules' component='{Rules}' />
	</Router>
</ViewScreen>