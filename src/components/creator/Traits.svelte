<script>
    import { CharacterStore } from '../../rules/Stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    const traits = Object.keys(char.traits)

    const traitPoints = 12
    let remaining = traitPoints - traits.length

    function countTraitPoints() {
        let traitCount = 0
        traits.forEach((trait) => { traitCount += char.traits[trait].score })
        remaining = traitPoints - traitCount
        char.updateProps()
    }
</script>

<div class='step'>
    <div class='step-title'>
        <h2>Traits</h2>
    </div>
    <div class='remaining'>
        <h3>Points Remaining: {remaining}</h3>
    </div>
    {#each traits as trait}
        <div class='stat-block'>
            <span class='stat-label'>{char.traits[trait].name}</span>
            <input
                class='stat-input'
                type='number'
                min='1'
                max={Math.min(char.traits[trait].max, (char.traits[trait].score + remaining))}
                on:input={countTraitPoints}
                bind:value={char.traits[trait].score}
            >
        </div>
    {/each}
</div>

<style>
    .remaining {
        margin-left: 2rem;
    }
</style>