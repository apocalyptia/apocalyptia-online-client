<script>
    import { authUserStore } from '../../stores/netlifyStore'
    import { character } from '../../stores/characterStore'
    import { goto } from '@roxi/routify'
    import Character from '../../rules/Character'
    import LoadCharacter from '../../helpers/database/LoadCharacter'

    const newCharacter = () => {
        $character = new Character()
        $goto('/character/creator')
    }

    const loadCharacter = () => {
        $character = LoadCharacter($authUserStore.id)
        $goto('/character')
    }
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='cntr-card'>
	<button class='link-btn' on:click={newCharacter}>New Character</button>
	<button class='link-btn' on:click={loadCharacter}>Load Character</button>
</div>