<script>
    import { menuStore } from 'stores/menuStore.js'
</script>


<button class='user-btn'
    on:click={_ => $menuStore = $menuStore.toggle()}
>
    <div class='btn-icon'>::</div>
</button>


<style>
	.user-btn {
		align-items: center;
		background-color: var(--sec-color-trans);
		border-radius: var(--radius);
		border: var(--std-border) solid var(--pri-color);
		color: var(--pri-color);
		display: flex;
		font-size: var(--s150);
		font-weight: bold;
		height: var(--square);
		justify-content: center;
		max-height: var(--square);
		max-width: var(--square);
		min-height: var(--square);
		min-width: var(--square);
		padding-top: var(--s15);
		position: fixed;
		right: 0;
		text-align: center;
		top: 0;
		width: var(--square);
		z-index: 3;
	}
	.user-btn:active,
	.user-btn:focus,
	.user-btn:hover {
		background-color: var(--pri-color-trans);
		color: var(--sec-color);
	}
</style>