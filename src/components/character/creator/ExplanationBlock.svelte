<script>
    export let rule
</script>


<div class='explanation'>
    {#each rule as line}
        <p>{line}</p>
    {/each}
</div>


<style>
    .explanation {
        margin: var(--std-margin) 0;
    }
</style>