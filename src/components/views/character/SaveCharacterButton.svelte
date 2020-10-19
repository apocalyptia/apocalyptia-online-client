<script>
    import SaveCharacter from 'database/SaveCharacter.js'
    import { authUserStore } from 'stores/netlifyStore.js'
	import { character } from 'stores/characterStore.js'

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