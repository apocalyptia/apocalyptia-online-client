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

	.projection {
		animation: haze 1s infinite;
		background-size: 100% 2px, 3px 100%;
		background: var(--rgb-background);
		content: ' ';
		display: block;
		z-index: 12;
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
	

	main {
		z-index: 6;
	}
</style>