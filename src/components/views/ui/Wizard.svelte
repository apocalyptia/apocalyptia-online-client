<script>
export let ToC
</script>


<div class='wizard'>
	<svelte:component this={$ToC.pages[$ToC.currentIndex]}/>
</div>