<script>
    export let path
</script>


<a href={ path } class='back-btn'>
	<div class='link-btn back-btn'>&#9668;</div>
</a>


<style>
    .back-btn {		
		bottom: 0;
		font-size: var(--s150);
		height: var(--s300);
		left: 0;
		position: fixed;
		width: var(--s300);
		z-index: 5;
	}
</style>