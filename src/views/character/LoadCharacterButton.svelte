<script>
    import LoadCharacter from '../../helpers/database/LoadCharacter'
    import { authUserStore } from '../../stores/netlifyStore'

    const loadCharacter = async () => {
		console.log('------------------------------------')
        let load = await LoadCharacter($authUserStore)
		console.log(`LOAD CHARACTER = ${load}`)
		console.log('------------------------------------')
	}
</script>


<button
    class='small-cntr-btn'
    on:click={loadCharacter}>
    Load
</button>