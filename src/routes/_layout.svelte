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
	::-webkit-scrollbar {
		display: none;
	}
	.screen {
		background: radial-gradient(var(--sec-color-trans) 40%, #121 60%, #010 100%);
		bottom: 0;
		left: 0;
		overflow: scroll;
		position: absolute;
		right: 0;
		scrollbar-width: none;
		top: 0;
		z-index: 0;
	}
	.screen::after {
		animation: flicker 0.15s infinite;
		background: rgba(18, 16, 16, 0.1);
		bottom: 0;
		content: " ";
		display: block;
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 3;
	}
	@keyframes flicker {
		0% { opacity: 0.27861; }
		5% { opacity: 0.34769; }
		10% { opacity: 0.23604; }
		15% { opacity: 0.90626; }
		20% { opacity: 0.18128; }
		25% { opacity: 0.83891; }
		30% { opacity: 0.65583; }
		35% { opacity: 0.67807; }
		40% { opacity: 0.26559; }
		45% { opacity: 0.84693; }
		50% { opacity: 0.96019; }
		55% { opacity: 0.08594; }
		60% { opacity: 0.20313; }
		65% { opacity: 0.71988; }
		70% { opacity: 0.53455; }
		75% { opacity: 0.37288; }
		80% { opacity: 0.71428; }
		85% { opacity: 0.70419; }
		90% { opacity: 0.70031; }
		95% { opacity: 0.36108; }
		100% { opacity: 0.24387; }
	}

	.projection {
		animation: haze .1s infinite;
		background-size: 100% 2px, 3px 100%;
		background: linear-gradient(rgba(18, 16, 16, 0) 100%, rgba(0, 0, 0, 0.25) 100%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
		bottom: 0;
		content: ' ';
		display: block;
		height: 100vh;
		left: 0;
		overflow: scroll;
		position: absolute;
		right: 0;
		scrollbar-width: none;
		top: 0;
		z-index: 1;
	}
	@keyframes haze {
		0% { text-shadow: 0.4389924193300864px 0 1px rgba(0,30,127,0.5), -0.4389924193300864px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		5% { text-shadow: 2.7928974010788217px 0 1px rgba(0,30,127,0.5), -2.7928974010788217px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		10% { text-shadow: 0.02956275843481219px 0 1px rgba(0,30,127,0.5), -0.02956275843481219px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		15% { text-shadow: 0.40218538552878136px 0 1px rgba(0,30,127,0.5), -0.40218538552878136px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		20% { text-shadow: 3.4794037899852017px 0 1px rgba(0,30,127,0.5), -3.4794037899852017px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		25% { text-shadow: 1.6125630401149584px 0 1px rgba(0,30,127,0.5), -1.6125630401149584px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		30% { text-shadow: 0.7015590085143956px 0 1px rgba(0,30,127,0.5), -0.7015590085143956px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		35% { text-shadow: 3.896914047650351px 0 1px rgba(0,30,127,0.5), -3.896914047650351px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		40% { text-shadow: 3.870905614848819px 0 1px rgba(0,30,127,0.5), -3.870905614848819px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		45% { text-shadow: 2.231056963361899px 0 1px rgba(0,30,127,0.5), -2.231056963361899px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		50% { text-shadow: 0.08084290417898504px 0 1px rgba(0,30,127,0.5), -0.08084290417898504px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		55% { text-shadow: 2.3758461067427543px 0 1px rgba(0,30,127,0.5), -2.3758461067427543px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		60% { text-shadow: 2.202193051050636px 0 1px rgba(0,30,127,0.5), -2.202193051050636px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		65% { text-shadow: 2.8638780614874975px 0 1px rgba(0,30,127,0.5), -2.8638780614874975px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		70% { text-shadow: 0.48874025155497314px 0 1px rgba(0,30,127,0.5), -0.48874025155497314px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		75% { text-shadow: 1.8948491305757957px 0 1px rgba(0,30,127,0.5), -1.8948491305757957px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		80% { text-shadow: 0.0833037308038857px 0 1px rgba(0,30,127,0.5), -0.0833037308038857px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		85% { text-shadow: 0.09769827127241735px 0 1px rgba(0,30,127,0.5), -0.09769827255241735px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		90% { text-shadow: 3.443339761481782px 0 1px rgba(0,30,127,0.5), -3.443339761481782px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		95% { text-shadow: 2.1841838852799786px 0 1px rgba(0,30,127,0.5), -2.1841838852799786px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
		100% { text-shadow: 2.6208764473832513px 0 1px rgba(0,30,127,0.5), -2.6208764473832513px 0 1px rgba(127,0,80,0.3), 0 0 3px; }
	}

	.lines {
		background-repeat: repeat-y;
		background-size: 100% var(--s25);
		background-color: linear-gradient(var(--sec-color) 50%, #232 50%);
		height: 100vh;
		position: absolute;
		width: 100vw;
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
		position: absolute;
		width: 100vw;
		z-index: 3;
	}
	@keyframes hline {
		0%  { top: 0; }
		20% { top: 100vh; }
	}

	.console {
		background: linear-gradient(var(--pri-color-trans) 0%, var(--sec-color-trans) 20%);
		background-repeat: repeat-y;
		background-size: 100% 3px;
		left: 0;
		opacity: 1;
		overflow: scroll;
		position: absolute;
		scrollbar-width: none;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 4;
	}
	
	.program {
		/* animation: wobble 19s linear infinite; */
		height: 100vh;
		left: 0;
		overflow: scroll;
		position: absolute;
		scrollbar-width: none;
		top: 0;
		width: 100vw;
		z-index: 5;
	}
	/* @keyframes wobble {
		0.0% { transform: skew(25deg); }
		0.1% { transform: skew(0deg); }
		0.2% { transform: skew(-25deg); }
		0.3% { transform: skew(0deg); }
	} */

	main {
		/* bottom: 0;
		overflow: scroll;
		position: absolute;
		top: var(--square); */
		width: 100vw;
		z-index: 6;
	}
</style>