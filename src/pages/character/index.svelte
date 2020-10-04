<script>
    import BackButton from '../../views/widgets/BackButton.svelte'
    import Character from '../../rules/Character'
    import CharacterSheet from '../../views/character/CharacterSheet.svelte'
    import { character } from '../../stores/characterStore'
    import { goto } from '@roxi/routify'

    const newCharacter = () => {
        $character = new Character()
        $goto('/character/new')
    }
</script>

<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
{#if !$character.meta.user}
    <div class='cntr-card'>
        <button class='link-btn' on:click={newCharacter}>New Character</button>
        <button class='link-btn' on:click={$goto('/characters/load')}>Load Character</button>
    </div>
{:else}
    <CharacterSheet mode={'edit'} />
{/if}
<BackButton path={'/'} />