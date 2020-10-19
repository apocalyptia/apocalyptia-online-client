<script>
    import Gear from 'rules/gear/Gear.js'
    import GearBlock from 'views/widgets/GearBlock.svelte'
    import ManRuleDesc from 'views/manual/ManRuleDesc.svelte'
    import ManRuleSpecs from 'views/manual/ManRuleSpecs.svelte'
    import ManRuleTable from 'views/manual/ManRuleTable.svelte'
    import ManSubRule from 'views/manual/ManSubRule.svelte'

    export let rule
</script>


<details class='rule-ref' bind:open={rule.visible}>
    <summary>
        {rule.name}
    </summary>
    <div class='rule-body'>
        {#if rule instanceof Gear }
            <div class='gear-rule'>
                <GearBlock item={rule} mode={'manual'} />
            </div>
        {:else}
            {#if rule.desc != undefined}
                <ManRuleDesc {rule} />
            {/if}
        {/if}
        {#if rule.subrules}
            {#each rule.subrules as subrule}
                <ManSubRule {subrule} />
            {/each}
        {/if}
        {#if rule.table != undefined}
            <ManRuleTable {rule} />
        {/if}
        {#if rule.specs}
            <ManRuleSpecs {rule} />
        {/if}
    </div>
</details>


<style>
    .rule-ref {
		margin-bottom: var(--s200);
		width: 80%;
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
			.gear-rule {
				margin: var(--s100);
			}
</style>