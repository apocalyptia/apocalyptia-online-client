<script>
	import { Route, Router } from 'svelte-routing'
	import TitleBar from './layout/TitleBar.svelte'
	import NavBar from './layout/NavBar.svelte'
	import Home from './pages/Home.svelte'
	import Character from './pages/Character.svelte'
	import Rules from './pages/Rules.svelte'
</script>

<main>
	<div class="console">
		<div class="screen">
			<div class="display">
				<TitleBar />
				<Router>
					<Route path="/" component="{Home}" />
					<Route path="/character" component="{Character}" />
					<Route path="/rules" component="{Rules}" />
				</Router>
				<NavBar />
			</div>
		</div>
	</div>
</main>

<style>
	main, .console, .screen, .display {
		height: 100vh;
		margin: 0;
		padding: 0;
		width: 100vw;
	}
	.screen:before {
		animation: hline 10s linear infinite;
		background: rgb(100, 247, 100, .1);
		content: '';
		font-size: 1px;
		height: 1px;
		position: absolute;
		width: 100vw;
	}
	@keyframes hline {
		0%   { top: 1%; }
		100% { top: 99%; }
	}
</style>
