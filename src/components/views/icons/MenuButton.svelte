<script>
    import menuStore from 'stores/menuStore.js'
</script>


<button
    class='btn-box user-btn'
    on:click={_ => $menuStore = $menuStore.toggle()}
>
    <div class='btn-icon'>::</div>
</button>


<style>
    .user-btn {
		height: var(--square);
		max-height: var(--square);
		max-width: var(--square);
		min-height: var(--square);
		min-width: var(--square);
		position: fixed;
		right: 0;
		top: 0;
		width: var(--square);
		z-index: 10;
	}
	.user-btn:focus {
		background-color: var(--pri-color);
		color: var(--sec-color);
	}
</style>