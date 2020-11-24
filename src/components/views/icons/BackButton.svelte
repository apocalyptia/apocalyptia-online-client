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
		height: var(--icon-size);
		left: 0;
		max-height: var(--icon-size);
		max-width: var(--icon-size);
		min-height: var(--icon-size);
		min-width: var(--icon-size);
		position: fixed;
		width: var(--icon-size);
		z-index: 6;
	}
</style>