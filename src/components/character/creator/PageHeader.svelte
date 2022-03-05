<script>
	import characterStore from '$stores/characterStore.js'

	export let chapter
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - {chapter}</title>
</svelte:head>
<hgroup>
	<h1>{chapter}</h1>
	Step {$characterStore.meta.step} / 6
</hgroup>


<style>
	hgroup {
		align-items: center;
		display: flex;
		font-weight: bold;
		justify-content: space-between;
	}
</style>
