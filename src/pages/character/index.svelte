<script>
    import Character from '../../rules/Character'
    import CharacterSheet from '../../views/character/CharacterSheet.svelte'
    import LoadCharacter from '../../helpers/database/LoadCharacter'
    import { authUserStore } from '../../stores/netlifyStore'
    import { character } from '../../stores/characterStore'
    import { goto } from '@roxi/routify'

    const newCharacter = () => {
        $character = new Character()
        $goto('/character/creator')
    }

    const loadCharacter = () => {
        console.log(`USER ID = ${$authUserStore.id}`)
        $character = LoadCharacter($authUserStore.id)
    }
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
{#if !$character.meta.user}
    <div class='cntr-card'>
        <button class='link-btn' on:click={newCharacter}>New Character</button>
        <button class='link-btn' on:click={loadCharacter}>Load Character</button>
    </div>
{:else}
    <CharacterSheet mode={'edit'} />
{/if}