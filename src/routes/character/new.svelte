<script>
    import BackButton from 'icons/BackButton.svelte'
    import Character from 'classes/Character.js'
    import GoTo from 'utils/GoTo.js'
    import RandomCharacter from 'random/RandomCharacter.js'
    import { character } from 'stores/characterStore.js'

    const buildCharacter = _ => GoTo(`character/creator`)

    const randomCharacter = _ => {
        $character = new Character()
        $character = RandomCharacter($character)
        GoTo(`character/sheet`)
    }
</script>


<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <button class='link-btn' on:click={buildCharacter}>Build</button>
    <button class='link-btn' on:click={randomCharacter}>Random</button>
</div>
<BackButton path={'character'} />