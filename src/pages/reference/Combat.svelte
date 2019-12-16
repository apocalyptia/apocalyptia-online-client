<script>
    import { Combat } from '../../rules/Combat'
    import RefList from '../../layout/RefList.svelte'
    import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page'>
    <svelte:component this={RefList} list={Combat} />
</div>

<style>
</style>