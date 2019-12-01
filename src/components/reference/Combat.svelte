<script>
    import { CombatRuleList } from '../../models/rules/combat.js'
</script>

<div class='combat-rules'>
    <label class='checkbar'>
        <div class='section-title'>
            <h2>Combat</h2>
        </div>
    </label>
    <div>
        {#each CombatRuleList as rule}
            <div>
                <span>{rule.name}: {rule.notes}</span>
            </div>
            <br>
        {/each}
    </div>
</div>

<style>
</style>