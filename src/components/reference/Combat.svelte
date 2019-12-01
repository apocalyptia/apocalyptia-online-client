<script>
    import HideShow from '../../layout/HideShow'
    import { CombatRuleList } from '../../models/rules/combat.js'

    let list = CombatRuleList
</script>

<div class='combat-rules'>
    <h2>Combat</h2>
    <div class='separator'/>
    {#each list as rule}
        <div class='rule-box' on:click={() => list = HideShow(rule, list)}>
            <span class='rule-name'>{rule.name}</span>
            {#if rule.visible}
                <div class='rule-notes'>{rule.notes}</div>
            {/if}
        </div>
        <div class='separator'/>
    {/each}
</div>

<style>
    .combat-rules {
        padding: 25px;
    }
    .rule-box {
        border: 1px dotted lime;
        padding: 25px;
    }
    .rule-name {
        font-size: 1.1em;
    }
    .rule-notes {
        padding-top: 25px;
    }
    .separator {
        height: 25px;
    }
</style>