<script>
    export let rule
</script>


<div class='explanation'>
    {#each rule.text as line}
        <p>{line}</p>
    {/each}
</div>