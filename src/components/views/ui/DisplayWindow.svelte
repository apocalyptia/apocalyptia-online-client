<div class='display-window'>
	<div class='page-container'>
		<slot/>
	</div>
</div>


<style>
.display-window {
	bottom: var(--s300);
	overflow: scroll;
	position: absolute;
	top: var(--s300);
	width: 100vw;
}
.page-container {
	margin: var(--s100);
	overflow: scroll;
}
</style>