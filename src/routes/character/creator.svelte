<script>

	import NavBar from '/src/components/character/creator/navbar/NavBar.svelte'
	import creationStore from '/src/stores/creationStore.js'
	import { onMount } from 'svelte'

	onMount(() => $creationStore.step = 0)
</script>


<div id="character-creator" class="page-body">
	<svelte:component this={$creationStore.process[$creationStore.step]} />
</div>
<NavBar />

<style>
	#character-creator {
		bottom: calc(var(--square) + 2px);
	}
</style>
