<script>
	import TitleBar from '$components/widgets/TitleBar.svelte'
	import Version from '$utils/Version.js'
</script>


<div class='screen'>
	<div class='lines'>
		<div class='scanline'>
			<div class="console">
				<div class="program">
					<version>
						{Version}
					</version>
					<header>
						<TitleBar />
					</header>
					<main>
						<slot />
					</main>
				</div>
			</div>
		</div>
	</div>
</div>


<style>
	header {
		height: var(--square);
	}
	::-webkit-scrollbar {
		display: none;
	}
	.screen {
		background: radial-gradient(var(--sec-color-trans) 40%, #121 60%, #010 100%);
		z-index: 0;
	}
	.lines {
		background-repeat: repeat-y;
		background-size: 100% var(--s25);
		background-color: linear-gradient(var(--sec-color) 50%, #232 50%);
		z-index: 12;
	}

	.scanline {
		background-color: transparent;
		overflow-y: auto;
		z-index: 3;
	}
	.scanline:before {
		animation: hline 7s linear infinite;
		background: var(--pri-color-trans);
		content: '';
		height: 1px;
		left: 0;
		position: absolute;
		right: 0;
		z-index: 3;
	}
	@keyframes hline {
		0%  { top: 0; }
		20% { top: 100vh; }
	}

	.console {
		background: linear-gradient(var(--pri-color-trans) 0%, rgba(15, 30, 15, .015) 20%);
		background-repeat: repeat-y;
		background-size: 100% 3px;
		z-index: 4;
	}
	
	.program {
		animation: wobble 30s linear infinite;
		z-index: 5;
	}
	@keyframes wobble {
		0.0% { transform: skew(25deg); }
		0.1% { transform: skew(0deg); }
		0.2% { transform: skew(-25deg); }
		0.3% { transform: skew(0deg); }
	}

	main {
		z-index: 6;
	}

	version {
		border: 1px solid crimson;
		color: crimson;
		font-size: var(--s50);
		left: 0;
		padding: 2px;
		position: absolute;
		top: calc(var(--square) + 1px);
	}
</style>