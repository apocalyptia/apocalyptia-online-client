<script>
	import CharacterStore from '/src/classes/stores/CharacterStore.js'
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'

	function newCharacter() {
		$characterStore = new CharacterStore()
	}

	function randomCharacter() {
		$characterStore = new CharacterStore()
		$characterStore = $characterStore.randomCharacter() // TODO: Needs work!
		$characterStore = $characterStore.finalizeCharacter()
		$playerStore = $playerStore.saveCharacter($characterStore)
	}
</script>

<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<CenterCard title={'New Character'}>
	<a href="/character/creator" class="link-btn" on:click={newCharacter}> Build </a>
	<!-- <a href="/character/sheet" class="link-btn" on:click={randomCharacter}> Random </a> -->
</CenterCard>

<style>
	a {
		margin-bottom: var(--margin);
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>
