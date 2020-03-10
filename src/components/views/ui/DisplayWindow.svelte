<div class='display-window'>
	<div class='page-container'>
		<slot/>
	</div>
</div>


<style>
.display-window {
	position: absolute;
	top: var(--s300);
	height: calc(100vh - var(--s600));
	bottom: var(--s300);
	width: 100vw;
}
.page-container {
	margin: var(--s100);
	margin-bottom: var(--s500);
}
</style>