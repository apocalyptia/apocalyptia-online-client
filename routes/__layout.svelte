<script>
	import TitleBar from '/src/components/widgets/TitleBar.svelte'
	import getRules from '/src/utils/api/getRules'
	import rulesStore from '/src/stores/rulesStore.js'
	import { onMount } from 'svelte'

	onMount(async () => {
		if ($rulesStore.loading) {
			await getRules().then(res => {
				$rulesStore.creation = res.creation
				$rulesStore.list = res.list
				$rulesStore.loading = false
			})
		}
	})
</script>


<div class='screen'>
	<div class='scanline'>
		<div class="console">
			<div class="program">
				<header>
					<TitleBar />
				</header>
				<main>
					<slot></slot>
				</main>
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
		background: var(--pri-color-trans);
		content: '';
		height: 1px;
		left: 0;
		position: absolute;
		right: 0;
		z-index: 3000;
	}
	@keyframes hline {
		0%  { top: 0; }
		20% { top: 100vh; }
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
		0.0% { transform: skew(25deg); }
		0.1% { transform: skew(0deg); }
		0.2% { transform: skew(-25deg); }
		0.3% { transform: skew(0deg); }
	}

	main {
		z-index: 6;
	}
</style>