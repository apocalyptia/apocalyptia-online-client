<script>
    import HideShow from './HideShow'

    export let list
</script>

<div class='page'>
    <h2>{list.name}</h2>
    <div class='separator'/>
    {#each list.rules as r}
        <div class='box' on:click={() => list = HideShow(r, list)}>
            <span class='name'>{r.name}</span>
            {#if r.visible}
                <div class='notes'>{r.notes}</div>
            {/if}
        </div>
        <div class='separator'/>
    {/each}
</div>

<style>
    .box {
        border: 1px dotted lime;
        padding: 25px;
    }
    .name {
        font-size: 1.1em;
    }
    .notes {
        padding-top: 25px;
    }
    .separator {
        height: 25px;
    }
</style>