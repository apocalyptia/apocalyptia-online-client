<script>
    import DeleteCharacter from '../../helpers/database/DeleteCharacter'
    import { authUserStore } from '../../stores/netlifyStore'

    const deleteCharacter = () => {
      DeleteCharacter($authUserStore.id)
    }
</script>


<button
    class='small-cntr-btn'
    on:click={deleteCharacter}>
    Delete
</button>