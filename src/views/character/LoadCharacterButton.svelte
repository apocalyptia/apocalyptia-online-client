<script>
    import LoadCharacter from '../../helpers/database/LoadCharacter'
    import { authUserStore } from '../../stores/netlifyStore'
    import { character } from '../../stores/characterStore'

    const loadCharacter = () => {
        $character = LoadCharacter($authUserStore)
	}
</script>


<button
    class='small-cntr-btn'
    on:click={loadCharacter}>
    Load
</button>