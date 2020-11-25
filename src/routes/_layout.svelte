<script>
	import { fade } from 'svelte/transition';
	import TitleBar from 'views/widgets/TitleBar.svelte'
</script>


<div class='screen'>
	<div class='lines'>
		<div class='scanline'>
			<div class="console">
				<div class="program">
					<header>
						<TitleBar />
					</header>
					<main transition:fade>
						<slot />
					</main>
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
		animation: flicker .001s linear infinite;
		height: 100vh;
		left: 0;
		overflow: scroll;
		position: absolute;
		scrollbar-width: none;
		top: 0;
		width: 100vw;
		z-index: 0;
	}
	@keyframes flicker {
		0%  { transform: scale(.995); }
		50% { transform: scale(1); }
	}
	.lines {
		position: absolute;
		background: linear-gradient(var(--sec-color) 50%, #333 50%);
		background-repeat: repeat-y;
		background-size: 100% var(--s25);
		height: 100vh;
		width: 100vw;
		z-index: 1;
	}
	.scanline {
		background-color: transparent;
		overflow-y: auto;
		z-index: 2;
	}
	.scanline:before {
		animation: hline 11s linear infinite;
		background: var(--pri-color-trans);
		content: '';
		height: 1px;
		position: absolute;
		width: 100vw;
		z-index: 3;
	}
	@keyframes hline {
		0%   { top: 0; }
		20% { top: 100vh; }
	}
	.console {
		animation: skew 19s linear infinite;
		background-repeat: repeat-y;
		background-size: 100% 1px;
		background: linear-gradient(var(--sec-color-trans) 1%, var(--sec-color-trans) 99%);
		height: 100vh;
		left: 0;
		opacity: 1;
		overflow: scroll;
		position: absolute;
		scrollbar-width: none;
		top: 0;
		width: 100vw;
		z-index: 4;
	}
	@keyframes skew {
		0%  { transform: skew(25deg); }
		0.1% { transform: skew(0deg); }
		0.2% { transform: skew(-25deg); }
		0.3% { transform: skew(0deg); }
	}
	.program:before {
		animation: pulse 1s linear infinite;
	}
	.program {
		background-repeat: repeat-y;
		background-size: 100% 1px;
		background: radial-gradient(var(--sec-color-trans));
		height: 100vh;
		left: 0;
		overflow: scroll;
		position: absolute;
		scrollbar-width: none;
		top: 0;
		width: 100vw;
		z-index: 5;
	}
	main {
		height: calc(100vh - var(--titlebar-height));
		overflow: scroll;
		position: absolute;
		top: var(--titlebar-height);
		width: 100vw;
		z-index: 6;
	}
</style>