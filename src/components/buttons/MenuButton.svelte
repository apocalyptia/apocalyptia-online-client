<script>
    import menuStore from 'stores/menuStore.js'
</script>


<button class='btn-box square-btn'
    on:click={_ => $menuStore = $menuStore.toggle()}
>
	<div class='menu-icon-box'>
		<img class='menu-icon' src='/icons/menu.png' alt='Menu Icon'>
	</div>
</button>


<style>
	.menu-icon-box {
		position: fixed;
		right: 0;
		top: 0;
		z-index: 3;
		height: var(--square);
		width: var(--square);
		padding: var(--std-padding);
	}
	.menu-icon-box:hover {
		filter: brightness(0%) grayscale(100%);
	}
	.menu-icon {
		height: 100%;
		transform: scale(1, 1);
	}
</style>