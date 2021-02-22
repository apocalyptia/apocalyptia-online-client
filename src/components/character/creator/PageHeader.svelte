<script>
	export let chapter, step
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - {chapter}</title>
</svelte:head>
<hgroup>
	<h1>{chapter}</h1>
	{#if step < 6}
		<h2>Step {step}/6</h2>
	{/if}
</hgroup>


<style>
	hgroup {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
</style>