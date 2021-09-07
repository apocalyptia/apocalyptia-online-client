<script>
	export let path = '/'
</script>

<a href={path} class="back-btn btn-box">
	<button class="back-btn btn-icon square-btn">&lt;</button>
</a>

<style>
	.back-btn {
		bottom: 0;
		left: 0;
		position: fixed;
		z-index: 6;
	}
	.back-btn:hover {
		text-decoration: none !important;
	}
</style>
