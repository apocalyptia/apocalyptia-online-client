<div class='display-window'>
	<slot />
</div>

<style>
	.display-window {
		bottom: 50px;
		height: calc(100vh - 100px);
		position: absolute;
		top: 50px;
		width: 100vw;
	}
</style>