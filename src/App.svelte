<script>
	import { Route, Router } from 'svelte-routing'
	import TitleBar from './layout/TitleBar.svelte'
	import Home from './pages/Home.svelte'
	import Creator from './pages/Creator.svelte'
	import Rules from './pages/Rules.svelte'
</script>

<div class="screen">
	<div class="display">
		<TitleBar />
		<Router>
			<Route path="/" component="{Home}" />
			<Route path="/creator" component="{Creator}" />
			<Route path="/rules" component="{Rules}" />
		</Router>
	</div>
</div>

<style>
	.screen {
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100vw;
	}
	.screen:before {
		animation: hline 10s linear infinite;
		background: rgb(100, 250, 100, .1);
		content: '';
		font-size: 1px;
		height: 1px;
		position: absolute;
		width: 100vw;
		z-index: 1000;
	}
	@keyframes hline {
		0%   { top: 0; }
		100% { top: 99%; }
	}
	.display {
		margin-top: 40px;
	}
</style>
