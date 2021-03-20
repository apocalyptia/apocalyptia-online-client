<script>
    import BackButton from '/src/components/buttons/BackButton.svelte'
    import Character from '/src/classes/Character.js'
	import RandomCharacter from '/src/rules/random/RandomCharacter.js'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'

	const newCharacter = _ => {
		$characterStore = new Character()
		$playerStore.newCharacter($characterStore)
	}

    const randomCharacter = _ => {
		$characterStore = RandomCharacter(new Character())
		$playerStore = $playerStore.newCharacter($characterStore)
    }
</script>


<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <a href='/creator' class='link-btn' on:click={newCharacter}>Build</a>
    <a href='/creator' class='link-btn' on:click={randomCharacter}>Random</a>
</div>
<BackButton path={'character'} />