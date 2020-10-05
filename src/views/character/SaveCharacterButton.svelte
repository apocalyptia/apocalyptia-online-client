<script>
    import SaveCharacter from '../../helpers/database/SaveCharacter'
    import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'

    const createCharacter = async () => {
		$character.finalize($authUserStore.id)
		await SaveCharacter($character)
	}
</script>


<button
    class='small-cntr-btn'
    on:click={createCharacter}>
    Save
</button>