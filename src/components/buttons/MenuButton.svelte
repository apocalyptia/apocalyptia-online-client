<script>
    import { menuStore } from 'stores/menuStore.js'
</script>


<button class='btn-box green-btn square-btn'
    on:click={_ => $menuStore = $menuStore.toggle()}
>
    <div class='btn-icon user-btn'>::</div>
</button>


<style>
	.user-btn {
		padding: var(--std-padding);
		position: fixed;
		right: 0;
		top: 0;
		z-index: 3;
	}
</style>