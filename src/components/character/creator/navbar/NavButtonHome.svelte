<script>
	function home() {
		window.location.href = '/'
	}
</script>

<button on:click={home} class='home-btn btn-box'>
	<div class='home-icon-box'>Home</div>
</button>

<style>
	button {
		height: var(--square);
		width: 100%;
	}
	.btn-box {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.home-icon-box {
		font-size: var(--s150);
	}
</style>
