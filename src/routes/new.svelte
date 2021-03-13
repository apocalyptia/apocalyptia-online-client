<script>
    import BackButton from 'components/buttons/BackButton.svelte'
    import Character from 'classes/Character.js'
	import RandomCharacter from 'rules/random/RandomCharacter.js'
	import characterStore from 'stores/characterStore.js'
	import playerStore from 'stores/playerStore.js'

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