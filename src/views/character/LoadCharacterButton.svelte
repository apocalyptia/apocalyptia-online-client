<script>
    import LoadCharacter from '../../helpers/database/LoadCharacter'
    import { authUserStore } from '../../stores/netlifyStore'
    import { character } from '../../stores/characterStore'

    const loadCharacter = async () => {
        let load = await LoadCharacter($authUserStore)
        console.log(`LOAD = ${load}`)
	}
</script>


<button
    class='small-cntr-btn'
    on:click={loadCharacter}>
    Load
</button>