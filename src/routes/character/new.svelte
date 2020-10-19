<script>
    import BackButton from 'views/widgets/BackButton.svelte'
    import RandomCharacter from 'random/RandomCharacter.js'
    import { character } from 'stores/characterStore.js'


    const buildCharacter = () => {
        // window.location.assign(`www.apocalyptiaonline.com/character/creator/description`)
    }

    const randomCharacter = () => {
        $character.meta.status.step = 7
		$character = RandomCharacter($character)
		// window.location.assign(`www.apocalyptiaonline.com/character/creator/sheet`)
    }
</script>

<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <button class='link-btn' on:click={buildCharacter}>Build Character</button>
    <button class='link-btn' on:click={randomCharacter}>Random Character</button>
</div>
<BackButton path={'/character'} />