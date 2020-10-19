<script>
    import LoadCharacter from 'database/LoadCharacter.js'
    import { authUserStore } from 'stores/netlifyStore.js'
    import { character } from 'stores/characterStore.js'

    const loadCharacter = () => {
        $character = LoadCharacter($authUserStore)
	}
</script>


<button
    class='small-cntr-btn'
    on:click={loadCharacter}>
    Load
</button>