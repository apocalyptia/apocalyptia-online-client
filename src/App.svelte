<script>
	import ViewScreen from './layout/ViewScreen.svelte'
	import TitleBar from './layout/TitleBar.svelte'
	import DisplayWindow from './layout/DisplayWindow.svelte'
	import { Route, Router } from 'svelte-routing'
	import Home from './pages/Home.svelte'
	import Creator from './pages/Creator.svelte'
	import Reference from './pages/Reference.svelte'
</script>

<ViewScreen>
	<TitleBar />
	<DisplayWindow>
		<Router>
			<Route path='/' component='{Home}' />
			<Route path='/creator' component='{Creator}' />
			<Route path='/reference' component='{Reference}' />
		</Router>
	</DisplayWindow>
</ViewScreen>