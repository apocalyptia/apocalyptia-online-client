<script>
	const home = _ => {
		window.location.href = '/'
	}
</script>


<button on:click={home} class='home-btn btn-box'>
	<div class='home-icon-box'>
		<img class='home-icon' src='/icons/home.png' alt='Home Icon'>
	</div>
</button>


<style>
	button {
		height: var(--square);
		width: 100%;
	}
	.home-icon-box {
		height: 100%;
		padding: var(--std-padding);
		width: 100%;
	}
	.home-icon-box:hover {
		filter: brightness(0%) grayscale(100%);
	}
	.home-icon {
		height: 100%;
		transform: scale(1, 1);
	}
</style>