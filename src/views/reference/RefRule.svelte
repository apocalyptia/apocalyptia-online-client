<script>
    import Gear from '../../rules/gear/Gear'
    import GearBlock from '../widgets/GearBlock.svelte'
    import RefRuleDesc from './RefRuleDesc.svelte'
    import RefRuleSpecs from './RefRuleSpecs.svelte'
    import RefRuleTable from './RefRuleTable.svelte'
    import RefSubRule from './RefSubRule.svelte'

    export let rule
</script>


<details class='rule-ref' bind:open={rule.visible}>
    <summary>
        {rule.name}
    </summary>
    <div class='rule-body'>
        {#if rule instanceof Gear }
            <div class='gear-rule'>
                <GearBlock item={rule} mode={'reference'} />
            </div>
        {:else}
            {#if rule.desc != undefined}
                <RefRuleDesc {rule} />
            {/if}
        {/if}
        {#if rule.subrules}
            {#each rule.subrules as subrule}
                <RefSubRule {subrule} />
            {/each}
        {/if}
        {#if rule.table != undefined}
            <RefRuleTable {rule} />
        {/if}
        {#if rule.specs}
            <RefRuleSpecs {rule} />
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