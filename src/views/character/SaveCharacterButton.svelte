<script>
    import SaveCharacter from '../../helpers/database/SaveCharacter'
    import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'

    const createCharacter = () => {
		$character.finalize($authUserStore.id)
		$character = SaveCharacter($character)
		console.log($character)
	}
</script>


<button
    class='small-cntr-btn'
    on:click={createCharacter}>
    Save
</button>