<script>
    import { authUserStore } from '../../stores/netlifyStore'
    import { character } from '../../stores/characterStore'
    import { goto } from '@roxi/routify'
    import Character from '../../rules/Character'
    import LoadCharacter from '../../helpers/database/LoadCharacter'

    const newCharacter = () => {
        let confirmNew = false
        let existingCharacter = window.localStorage.getItem('character')
        console.log(existingCharacter)
        if (existingCharacter != null) {
            confirmNew = window.alert(
                `You already have an existing character.
                \n
                Creating a new character will overwrite your existing character.
                \n
                Do you wish to proceed?`
            )
        }
        if (existingCharacter == null || confirmNew) {
            $character = new Character()
            $goto('/character/creator')
        }
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