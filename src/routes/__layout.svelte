<script>
	import TitleBar from '/src/components/titlebar/TitleBar.svelte'
	// import characterStore from '/src/stores/characterStore.js'
	// import playerStore from '/src/stores/playerStore.js'
	import { onMount } from 'svelte'

	onMount(() => {
		// if ($playerStore.selected !== null) {
		// 	$playerStore = $playerStore.initializePlayer()
		// 	$characterStore = $playerStore.selected
		// }
	})
</script>


<div class="screen">
	<div class="scanline">
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


<style>
	header {
		display: flex;
		height: var(--square);
		position: fixed;
		top: 0;
		transition: top 0.3s linear;
		width: 100vw;
		z-index: 9;
	}
	.screen {
		background: radial-gradient(#222 40%, #191919 70%, #111 85%, #000 100%);
		z-index: 0;
	}
	.scanline {
		background-color: transparent;
		overflow-y: auto;
		z-index: 3000;
	}
	.scanline:before {
		animation: hline 7s linear infinite;
		content: '';
		height: 1px;
		left: 0;
		position: absolute;
		right: 0;
		z-index: 3000;
	}
	@keyframes hline {
		0% {
			background: none;
			bottom: 95vh;
		}
		15% {
			background: var(--pri-color-trans);
		}
		30% {
			background: none;
			bottom: 0;
		}
	}
	.console {
		background: linear-gradient(var(--pri-color-trans) 0%, var(--sec-color-trans) 20%);
		background-repeat: repeat-y;
		background-size: 100% 3px;
		z-index: 4;
	}

	.program {
		animation: wobble 30s linear infinite;
		z-index: 5;
	}
	@keyframes wobble {
		0.0% {
			transform: skew(25deg);
		}
		0.1% {
			transform: skew(0deg);
		}
		0.2% {
			transform: skew(-25deg);
		}
		0.3% {
			transform: skew(0deg);
		}
	}
</style>
