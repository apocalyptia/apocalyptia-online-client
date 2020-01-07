<script>
	import { refToC } from '../../../stores'
</script>

<div class='nav-buttons'>
	<button class='nav-button' on:click={$refToC.back()}>&lt;</button>
	<button class='nav-button' on:click={$refToC.home()}>Contents</button>
	<button class='nav-button' on:click={$refToC.next()}>&gt;</button>
</div>

<style>
	.nav-buttons {
		bottom: 0;
		display: flex;
		justify-content: flex-end;
		left: 0;
		position: fixed;
		width: 100%;
	}
	.nav-button {
		border: 1px solid var(--txt-color);
		font-size: 1.25rem;
		height: 3rem;
		width: calc(100%/3)
	}
</style>