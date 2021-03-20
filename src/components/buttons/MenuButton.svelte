<script>
    import menuStore from '/src/stores/menuStore.js'
</script>


<button class='btn-box square-btn'
    on:click={_ => $menuStore = $menuStore.toggle()}
>
	<div class='menu-icon-box'>-</div>
</button>


<style>
	.btn-box {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.menu-icon-box {
		font-size: var(--s200);
		z-index: 3;
		padding-top: var(--s25);
	}
</style>