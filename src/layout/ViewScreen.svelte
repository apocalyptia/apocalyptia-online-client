<div class='screen'>
	<div class='display'>
        <slot />
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
