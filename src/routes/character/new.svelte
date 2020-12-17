<script>
    import BackButton from 'icons/BackButton.svelte'
    import Character from 'classes/Character.js'
    import RandomCharacter from 'random/RandomCharacter.js'
	import { character } from 'stores/characterStore.js'
	import { player } from 'stores/playerStore.js'

    const randomCharacter = _ => {
		$character = RandomCharacter(new Character())
		$player = $player.newCharacter($character)
    }
</script>


<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <a href='character/creator' class='link-btn'>Build</a>
    <a href='character/sheet' class='link-btn' on:click={randomCharacter}>Random</a>
</div>
<BackButton path={'character'} />