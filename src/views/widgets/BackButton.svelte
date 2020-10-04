<script>
    export let path
</script>


<a href={ path } class='back-btn'>
	<div class='back-btn'>&#9668;</div>
</a>


<style>
    .back-btn {
		align-items: center;
		background-color: rgb(15, 30, 15);
		border: 2px solid lime;
		bottom: 0;
		display: flex;
		font-size: var(--s150);
		height: var(--s300);
		justify-content: center;
		left: 0;
		position: fixed;
		text-align: center;
		width: var(--s300);
		z-index: 1;
	}
	.back-btn:active,
	.back-btn:focus,
	.back-btn:hover {
		background-color: lime;
		color: rgba(15, 30, 15, 1);
	}
</style>