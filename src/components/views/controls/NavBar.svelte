<script>
export let store
</script>


<div class='nav-bar'>
	<button on:click={() => store.back()}>&#9664;</button>
	<button class='home-button' on:click={() => store.home()}>{store.label}</button>
	<button on:click={() => store.next()}>&#9654;</button>
</div>


<style>
.nav-bar {
	bottom: 0;
	display: flex;
	left: 0;
	position: fixed;
	width: 100%;
}
button {
	flex: 1;
	font-size: var(--base-unit);
	font-weight: bold;
}
.home-button {
	font-size: calc(var(--base-unit) * 1.25);
}
</style>