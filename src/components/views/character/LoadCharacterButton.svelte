<script>
    import LoadCharacter from 'database/LoadCharacter.js'
    import { character } from 'stores/characterStore.js'

    const loadCharacter = () => {
        $character = LoadCharacter()
	}
</script>


<button
    class='small-cntr-btn'
    on:click={loadCharacter}>
    Load
</button>