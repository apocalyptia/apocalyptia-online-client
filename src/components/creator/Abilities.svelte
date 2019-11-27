<script>
    import { CharacterStore } from '../../data/stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    import { AbilityList } from  '../../data/character/abilities'

    function modifyAbilities() {
        char.abilities = [];
        AbilityList.forEach(function (ability) {
            if (ability.taken > 0) {
                char.abilities.push(ability);
            }
        })
    }
</script>

<div class="step">
    <div class="step-title">
        <h2>Abilities</h2>
    </div>
    <div class="stat-block">
        <div class="abilities-table">
            <div class="ability-row header-row separator">
                <div class="medium-column">Name</div>
                <div class="large-column">Description</div>
                <div class="small-column">Max</div>
                <div class="small-column">XP</div>
                <div class="small-column">Taken</div>
            </div>
            {#each AbilityList as ability, index}
                {#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}
                    <div class="separator"></div>
                {/if}
                <div class="ability-row">
                    <div class="medium-column">{ability.name}</div>
                    <div class="large-column">{ability.description}</div>
                    <div class="small-column">{ability.max}</div>
                    <div class="small-column">{ability.xp}</div>
                    <div class="small-column">
                        <input
                            type="number"
                            class="taken-number"
                            min=0
                            max={ability.max}
                            bind:value={ability.taken}
                            on:input={modifyAbilities}
                        >
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .abilities-table {
        width: 100%;
    }
    .ability-row {
        width: inherit;
    }
    .header-row {
        font-size: 1.25em;
    }
    .large-column {
        display: inline-block;
        width: 37.5%;
    }
    .medium-column {
        display: inline-block;
        width: 25%;
    }
    .small-column {
        display: inline-block;
        text-align: center;
        width: 10%;
    }
    .separator {
        border-bottom: 1px solid;
        margin-bottom: 10px;
        padding-bottom: 10px;
    }
</style>