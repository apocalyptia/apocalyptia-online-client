<script>
	import creationStore from '/src/stores/creationStore.js'

	export let chapter
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Creator - {chapter}</title>
</svelte:head>
<hgroup>
	<h1>{chapter}</h1>
	Step {$creationStore.step + 1} / 6
</hgroup>

<style>
	hgroup {
		align-items: center;
		display: flex;
		font-weight: bold;
		justify-content: space-between;
	}
</style>
