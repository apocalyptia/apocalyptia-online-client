<script>
    import RandomCharacter from '../../../helpers/random/RandomCharacter'
    import { character } from '../../../stores/characterStore'
    import { goto } from '@roxi/routify'


    const buildCharacter = () => {
        $goto('creator/description')
    }

    const randomCharacter = () => {
        $character.meta.status.step = 7
		$character = RandomCharacter($character)
		$goto('/character/creator/sheet')
    }
</script>

<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <button class='link-btn' on:click={buildCharacter}>Build Character</button>
    <button class='link-btn' on:click={randomCharacter}>Random Character</button>
</div>