<script>
    import SaveCharacter from 'database/SaveCharacter.js'
	import { character } from 'stores/characterStore.js'

    const createCharacter = () => {
		$character = SaveCharacter()
	}
</script>


<button
    class='small-cntr-btn'
    on:click={createCharacter}>
    Save
</button>