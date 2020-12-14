<script>
	import TitleBar from 'views/widgets/TitleBar.svelte'
</script>


<div class='screen'>
	<div class='projection'>
		<div class='lines'>
			<div class='scanline'>
				<div class="console">
					<div class="program">
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
	.screen::after {
		animation: flicker 0.15s infinite;
		background: rgba(18, 16, 16, 0.1);
		content: " ";
		display: block;
		opacity: 0;
		pointer-events: none;
		z-index: 3;
	}
	@keyframes flicker {
		0% { opacity: 0.27; }
		5% { opacity: 0.34; }
		10% { opacity: 0.23; }
		15% { opacity: 0.91; }
		20% { opacity: 0.18; }
		25% { opacity: 0.83; }
		30% { opacity: 0.65; }
		35% { opacity: 0.67; }
		40% { opacity: 0.26; }
		45% { opacity: 0.84; }
		50% { opacity: 0.96; }
		55% { opacity: 0.08; }
		60% { opacity: 0.21; }
		65% { opacity: 0.72; }
		70% { opacity: 0.53; }
		75% { opacity: 0.37; }
		80% { opacity: 0.71; }
		85% { opacity: 0.72; }
		90% { opacity: 0.71; }
		95% { opacity: 0.36; }
		100% { opacity: 0.24; }
	}
	.projection {
		animation: haze 1s infinite;
		background-size: 100% 2px, 3px 100%;
		background: var(--rgb-background);
		content: ' ';
		display: block;
		z-index: 12;
	}
	@keyframes haze {
		0% { text-shadow: 0.44px 0 1px var(--crt-blue), -0.44px 0 1px var(--crt-red), 0 0 3px; }
		5% { text-shadow: 2.79px 0 1px var(--crt-blue), -2.79px 0 1px var(--crt-red), 0 0 3px; }
		10% { text-shadow: 0.03px 0 1px var(--crt-blue), -0.03px 0 1px var(--crt-red), 0 0 3px; }
		15% { text-shadow: 0.41px 0 1px var(--crt-blue), -0.41px 0 1px var(--crt-red), 0 0 3px; }
		20% { text-shadow: 3.48px 0 1px var(--crt-blue), -3.48px 0 1px var(--crt-red), 0 0 3px; }
		25% { text-shadow: 1.61px 0 1px var(--crt-blue), -1.61px 0 1px var(--crt-red), 0 0 3px; }
		30% { text-shadow: 0.71px 0 1px var(--crt-blue), -0.71px 0 1px var(--crt-red), 0 0 3px; }
		35% { text-shadow: 3.89px 0 1px var(--crt-blue), -3.89px 0 1px var(--crt-red), 0 0 3px; }
		40% { text-shadow: 3.87px 0 1px var(--crt-blue), -3.87px 0 1px var(--crt-red), 0 0 3px; }
		45% { text-shadow: 2.23px 0 1px var(--crt-blue), -2.23px 0 1px var(--crt-red), 0 0 3px; }
		50% { text-shadow: 0.08px 0 1px var(--crt-blue), -0.08px 0 1px var(--crt-red), 0 0 3px; }
		55% { text-shadow: 2.38px 0 1px var(--crt-blue), -2.38px 0 1px var(--crt-red), 0 0 3px; }
		60% { text-shadow: 2.21px 0 1px var(--crt-blue), -2.21px 0 1px var(--crt-red), 0 0 3px; }
		65% { text-shadow: 2.86px 0 1px var(--crt-blue), -2.86px 0 1px var(--crt-red), 0 0 3px; }
		70% { text-shadow: 0.49px 0 1px var(--crt-blue), -0.49px 0 1px var(--crt-red), 0 0 3px; }
		75% { text-shadow: 1.89px 0 1px var(--crt-blue), -1.89px 0 1px var(--crt-red), 0 0 3px; }
		80% { text-shadow: 0.08px 0 1px var(--crt-blue), -0.08px 0 1px var(--crt-red), 0 0 3px; }
		85% { text-shadow: 0.09px 0 1px var(--crt-blue), -0.09px 0 1px var(--crt-red), 0 0 3px; }
		90% { text-shadow: 3.44px 0 1px var(--crt-blue), -3.44px 0 1px var(--crt-red), 0 0 3px; }
		95% { text-shadow: 2.18px 0 1px var(--crt-blue), -2.18px 0 1px var(--crt-red), 0 0 3px; }
		100% { text-shadow: 2.62px 0 1px var(--crt-blue), -2.62px 0 1px var(--crt-red), 0 0 3px; }
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
		animation: wobble 19s linear infinite;
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
</style>