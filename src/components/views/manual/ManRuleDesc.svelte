<script>
    import Ability from 'rules/abilities/Ability.js'

    export let rule
</script>


<div class='desc-section'>
    {#each rule.desc as desc}
        <p class='rule-desc'>{desc}</p>
    {/each}
</div>
{#if rule instanceof Ability}
    <p><span class='bold'>Max:</span> {rule.max}</p>
    <p><span class='bold'>XP:</span> {rule.xp}</p>
{/if}


<style>
    .rule-desc {
		margin-bottom: var(--s100);
	}
    .bold {
		font-weight: bold;
	}
</style>