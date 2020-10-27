<script>
    import LoadCharacter from 'database/LoadCharacter.js'
    // import { userStore } from 'stores/userStore.js'
    import { character } from 'stores/characterStore.js'

    const loadCharacter = _ => {
        // $character = LoadCharacter($userStore.id)
	}
</script>


<button
    class='small-cntr-btn'
    on:click={loadCharacter}>
    Load
</button>