<script>
    import BackButton from 'views/widgets/BackButton.svelte'
    import Character from 'rules/Character.js'
    import CharacterSheet from 'views/character/CharacterSheet.svelte'
    import { character } from 'stores/characterStore.js'

    const newCharacter = () => {
        $character = new Character()
        // window.location.assign(`www.apocalyptiaonline.com/character/new`)
    }

    const loadCharacter = () => {
        // window.location.assign(`www.apocalyptiaonline.com/character/load`)
    }
</script>

<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
{#if !$character.meta.user}
    <div class='cntr-card'>
        <button class='link-btn' on:click={newCharacter}>New Character</button>
        <button class='link-btn' on:click={loadCharacter}>Load Character</button>
    </div>
{:else}
    <CharacterSheet mode={'edit'} />
{/if}
<BackButton path={'/'} />