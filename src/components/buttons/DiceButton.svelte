<script>
	export let type, func
</script>


<button on:click={func}>
	<div class='dice-icon-box'>
		<img src='/icons/dice.png' alt='Random {type}'>
	</div>
</button>


<style>
	button {
		height: var(--square);
		padding: 0;
		width: var(--square);
	}
	.dice-icon-box {
		height: 100%;
		padding: var(--std-padding);
		width: 100%;
	}
	.dice-icon-box:hover {
		filter: brightness(0%) grayscale(100%);
	}
	img {
		height: 100%;
		transform: scale(1, 1);
	}
</style>