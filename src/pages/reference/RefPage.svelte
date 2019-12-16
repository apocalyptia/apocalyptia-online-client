<script>
    import RefList from '../../layout/RefList.svelte'
    import NavButtons from '../../layout/NavButtons.svelte'

    export let list
</script>

<div class='ref-page'>
    <svelte:component this={RefList} {list} />
</div>

<style>
</style>