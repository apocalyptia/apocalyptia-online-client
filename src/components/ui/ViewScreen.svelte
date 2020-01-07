<div class='view-screen'>
	<slot />
</div>

<style>
	.view-screen {
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
	}
	.view-screen:before {
		animation: hline 10s linear infinite;
		background: rgb(100, 250, 100, .1);
		content: '';
		font-size: 1px;
		height: 1px;
		position: absolute;
		width: 100%;
		z-index: 1000;
	}
	@keyframes hline {
		0%   { top: 0; }
		100% { top: 99%; } 
	}
</style>
