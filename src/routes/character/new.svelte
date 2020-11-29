<script>
    import BackButton from 'icons/BackButton.svelte'
    import Character from 'classes/Character.js'
    import RandomCharacter from 'random/RandomCharacter.js'
    import { character } from 'stores/characterStore.js'

    const randomCharacter = _ => {
        $character = new Character()
        $character = RandomCharacter($character)
    }
</script>


<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <a href='character/creator' class='link-btn'>Build</a>
    <a href='character/creator/finalize' class='link-btn' on:click={randomCharacter}>Random</a>
</div>
<BackButton path={'character'} />