<script>
	export let chapter, step
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - {chapter}</title>
</svelte:head>
<div class='page-header'>
	<h1>{chapter}</h1>
	{#if step < 6}
		<span>Step {step}/6</span>
	{/if}
</div>


<style>
    .page-header {
        display: flex;
        justify-content: space-between;
    }
    h1 {
        display: inline;
    }
    span {
        font-size: var(--s125);
    }
</style>