<script>
    import { authUserStore } from '../../stores/netlifyStore'
    import { character } from '../../stores/characterStore'
    import { goto } from '@roxi/routify'
    import LoadCharacter from '../../helpers/database/LoadCharacter'

    const newCharacter = () => $goto('/character/creator')

    const loadCharacter = () => {
        $character = LoadCharacter($authUserStore.id)
        $goto('/character/sheet')
    }
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='cntr-card'>
	<button class='link-btn'>New Character</button>
	<button class='link-btn' on:click={loadCharacter}>Load Character</button>
</div>