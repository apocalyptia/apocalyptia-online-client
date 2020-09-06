<div class='display-window'>
	<div class='page-container'>
		<slot/>
	</div>
</div>


<style>
	::-webkit-scrollbar {
		display: none;
	}
	.display-window {
		bottom: var(--s300);
		overflow: scroll;
		position: absolute;
		top: var(--s300);
		width: 100vw;
		scrollbar-width: none;
	}
	.page-container {
		margin: var(--s100);
		overflow: scroll;
		scrollbar-width: none;
	}
</style>