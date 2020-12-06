<script>
    export let path
</script>


<a href={ path } class='back-btn'>
	<div class='back-btn'>&lt;</div>
</a>


<style>
	.back-btn {
		align-items: center;
		background-color: var(--sec-color-trans);
		border-radius: var(--radius);
		border: var(--std-border) solid var(--pri-color);
		bottom: 0;
		color: var(--pri-color);
		display: flex;
		font-size: var(--s150);
		font-weight: bold;
		height: var(--square);
		justify-content: center;
		left: 0;
		max-height: var(--square);
		max-width: var(--square);
		min-height: var(--square);
		min-width: var(--square);
		position: fixed;
		text-align: center;
		width: var(--square);
		z-index: 6;
	}
	.back-btn:active,
	.back-btn:focus,
	.back-btn:hover {
		background-color: var(--pri-color-trans);
		color: var(--sec-color-trans);
	}
</style>