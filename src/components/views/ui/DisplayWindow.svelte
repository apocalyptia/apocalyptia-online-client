<div class='display-window'>
	<div class='page-container'>
		<slot />
	</div>
</div>


<style>
.display-window {
	position: absolute;
	top: var(--triple-unit);
	height: calc(100vh - (var(--triple-unit) * 2));
	bottom: var(--triple-unit);
	width: 100vw;
}
.page-container {
	margin: var(--base-unit);
	margin-bottom: calc(var(--base-unit) * 5);
}
</style>