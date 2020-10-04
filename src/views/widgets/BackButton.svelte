<script>
    export let path
</script>


<a href={ path } class='back-btn'>
	<div class='back-btn'>&#9668;</div>
</a>


<style>
    .back-btn {
		align-items: center;
		border: 2px solid lime;
		bottom: 0;
		display: flex;
		font-size: var(--s150);
		height: 46px;
		justify-content: center;
		left: 0;
		position: fixed;
		text-align: center;
		width: 46px;
	}
	.back-btn:active,
	.back-btn:focus,
	.back-btn:hover {
		background-color: lime;
		color: rgba(15, 30, 15, 1);
	}
</style>