<script>
    import Gear from '$classes/Gear.js'
	import GearBlock from '$components/widgets/GearBlock.svelte'
	import Disease from '$classes/Disease.js'
	import ManualDiseaseRule from '$components/manual/ManualDiseaseRule.svelte'
    import ManualRuleDescription from '$components/manual/ManualRuleDescription.svelte'
    import ManualRuleSpecialization from '$components/manual/ManualRuleSpecialization.svelte'
    import ManualRuleTable from '$components/manual/ManualRuleTable.svelte'
    import ManualSubRule from '$components/manual/ManualSubRule.svelte'

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
		{:else if rule instanceof Disease}
			<ManualDiseaseRule {rule} />
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