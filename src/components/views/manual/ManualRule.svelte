<script>
    import Gear from 'classes/Gear.js'
    import GearBlock from 'views/widgets/GearBlock.svelte'
    import ManualRuleDescription from 'views/manual/ManualRuleDescription.svelte'
    import ManualRuleSpecialization from 'views/manual/ManualRuleSpecialization.svelte'
    import ManualRuleTable from 'views/manual/ManualRuleTable.svelte'
    import ManualSubRule from 'views/manual/ManualSubRule.svelte'

    export let rule
</script>


<details class='rule-ref' bind:open={rule.visible}>
    <summary>
        {rule.name}{typeof rule == "Skill" ? " Skill" : "" }
    </summary>
    <div class='rule-body'>
        {#if rule instanceof Gear }
            <div class='gear-rule'>
                <GearBlock item={rule} mode={'manual'} />
            </div>
        {/if}
        {#if rule.desc != undefined}
            <ManualRuleDescription {rule} />
        {/if}
        {#if rule.subrules}
            {#each rule.subrules as subrule}
                <ManualSubRule {subrule} />
            {/each}
        {/if}
        {#if rule.table != undefined}
            <ManualRuleTable {rule} />
        {/if}
        {#if rule.specs}
            <ManualRuleSpecialization {rule} />
        {/if}
    </div>
</details>


<style>
    .rule-ref {
		margin-bottom: var(--s200);
		width: 100%;
	}
	@media only screen and (min-width: 650px) {
		.rule-ref {
			margin-left: auto;
			margin-right: auto;
			max-width: 80%;
		}
	}
		.rule-body {
			padding: var(--s100);
		}
</style>