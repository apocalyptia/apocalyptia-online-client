<script>
	import Character from '/src/classes/Character.js'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'

	function newCharacter() {
		$characterStore = new Character()
	}

	function randomCharacter() {
		$characterStore = new Character()
		$characterStore.randomCharacter()
		$characterStore.finalize()
		$playerStore.newCharacter($characterStore)
	}
</script>

<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class="cntr-card">
	<a href="/character/creator" class="link-btn" on:click={() => newCharacter()}> Build </a>
	<a href="/character/sheet" class="link-btn" on:click={() => randomCharacter()}> Random </a>
</div>
