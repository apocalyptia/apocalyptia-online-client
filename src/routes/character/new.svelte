<script>
	import Character from '/src/classes/Character.js'
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'

	function newCharacter() {
		$characterStore = new Character()
	}

	function randomCharacter() {
		$characterStore = new Character()
		$characterStore.randomCharacter()
		$characterStore.finalize()
		$playerStore.save($characterStore)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<CenterCard title={'New Character'}>
	<a href='/character/creator' class='link-btn' on:click={newCharacter}> Build </a>
	<a href='/character/sheet' class='link-btn' on:click={randomCharacter}> Random </a>
</CenterCard>


<style>
	a {
		margin-bottom: var(--std-margin);
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>