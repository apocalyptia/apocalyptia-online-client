<script>
    import Gear from 'classes/Gear.js'
    import GearBlock from 'views/widgets/GearBlock.svelte'
    import ManualRuleDescription from 'views/manual/ManualRuleDescription.svelte'
    import ManualRuleSpecialization from 'views/manual/ManualRuleSpecialization.svelte'
    import ManualRuleTable from 'views/manual/ManualRuleTable.svelte'
    import ManualSubRule from 'views/manual/ManualSubRule.svelte'

    export let rule
</script>


<details bind:open={rule.visible}>
    <summary>
        {rule.name}{typeof rule == "Skill" ? " Skill" : "" }
    </summary>
    <div class='rule-body'>
        {#if rule instanceof Gear }
            <div class='gear-rule'>
                <GearBlock item={rule} mode={'manual'} />
            </div>
        {:else if rule.desc != undefined}
            <ManualRuleDescription {rule} />
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
        {/if}
    </div>
</details>