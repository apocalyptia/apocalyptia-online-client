<script>
    import SaveCharacter from '../../helpers/database/SaveCharacter'
    import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'

    const createCharacter = async () => {
		$character.finalize($authUserStore.id)
		console.log('------------------------------------')
		let save = await SaveCharacter($character)
		console.log(`SAVE CHARACTER = ${save}`)
		console.log('------------------------------------')
	}
</script>


<button
    class='small-cntr-btn'
    on:click={createCharacter}>
    Save
</button>