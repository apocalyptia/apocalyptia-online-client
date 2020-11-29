<script>
    export let path
</script>


<a href={ path } class='back-btn'>
	<div class='link-btn back-btn'>&#9668;</div>
</a>


<style>
    .back-btn {		
		background-color: var(--sec-color-trans);
		bottom: 0;
		font-size: var(--s150);
		height: var(--square);
		left: 0;
		max-height: var(--square);
		max-width: var(--square);
		min-height: var(--square);
		min-width: var(--square);
		position: fixed;
		width: var(--square);
		z-index: 6;
	}
</style>