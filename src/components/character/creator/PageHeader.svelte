<script>
	export let chapter, step
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Creator - {chapter}</title>
</svelte:head>
<hgroup>
	<h1>{chapter}</h1>
	{#if step < 6}
		Step {step}/6
	{/if}
</hgroup>

<style>
	hgroup {
		align-items: center;
		display: flex;
		font-weight: bold;
		justify-content: space-between;
	}
</style>
