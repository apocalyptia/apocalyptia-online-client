<script>
    export let rule
</script>


<div class='desc-section'>
    {#each rule.desc as desc}
        <p>{desc}</p>
    {/each}
    {#if rule.type == 'Ability'}
        <p><span class='bold'>Max:</span> {rule.max}</p>
        <p><span class='bold'>XP:</span> {rule.xp}</p>
    {/if}
</div>


<style>
    p {
		padding-bottom: var(--s100);
	}
    .bold {
		font-weight: bold;
	}
</style>