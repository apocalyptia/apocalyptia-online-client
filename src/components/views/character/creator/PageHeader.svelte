<script>
	export let creator, step
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - {creator[step].name}</title>
</svelte:head>
<div class='page-header'>
	<h1>{creator[step].name}</h1>
	{#if step + 1 < creator.length}
		<span>Step {step+1}/{creator.length-1}</span>
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