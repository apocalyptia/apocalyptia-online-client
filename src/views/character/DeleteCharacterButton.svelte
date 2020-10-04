<script>
    import DeleteCharacter from '../../helpers/database/DeleteCharacter'
    import { authUserStore } from '../../stores/netlifyStore'

    const deleteCharacter = () => {
      console.log('------------------------------------')
      console.log(`USER = ${$authUserStore.id}`)
      console.log(`DELETE CHARACTER = ${DeleteCharacter($authUserStore.id)}`)
      console.log('------------------------------------')
    }
</script>


<button
    class='small-cntr-btn'
    on:click={deleteCharacter}>
    Delete
</button>