<script>
    import BackButton from 'views/widgets/BackButton.svelte'
    import RandomCharacter from 'random/RandomCharacter.js'
    import { character } from 'stores/characterStore.js'
	import { goto } from '@sapper/app'

    const buildCharacter = _ => {
        goto(`/character/creator`)
    }

    const randomCharacter = _ => {
        $character.meta.status.step = 7
        $character = RandomCharacter($character)
        goto(`/character/creator`)
    }
</script>


<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <button class='link-btn' on:click={buildCharacter}>Build</button>
    <button class='link-btn' on:click={randomCharacter}>Random</button>
</div>
<BackButton path={'/character'} />