<script>
    import DeleteCharacter from 'database/DeleteCharacter.js'
    import { authUserStore } from 'stores/netlifyStore.js'

    const deleteCharacter = () => {
      DeleteCharacter($authUserStore.id)
    }
</script>


<button
    class='small-cntr-btn'
    on:click={deleteCharacter}>
    Delete
</button>