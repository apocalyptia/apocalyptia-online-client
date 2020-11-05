<script>
    import SaveCharacter from 'database/SaveCharacter.js'
    // import { userStore } from 'stores/userStore.js'
	import { character } from 'stores/characterStore.js'

    const createCharacter = _ => {
		// $character = SaveCharacter($userStore.id, $character)
	}
</script>


<button
    class='small-cntr-btn'
    on:click={createCharacter}>
    Save
</button>