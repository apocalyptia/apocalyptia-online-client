<script>
export let store
</script>


<div class='nav-bar'>
	<button on:click={() => store.back()}>&lt;</button>
	<button on:click={() => store.home()}>{store.label}</button>
	<button on:click={() => store.next()}>&gt;</button>
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
	font-size: 1.25rem;
	font-weight: bold;
}
</style>