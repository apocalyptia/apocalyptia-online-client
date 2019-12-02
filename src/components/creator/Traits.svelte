<script>
    import { CharacterStore } from '../../models/stores.js'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    import { traitPoints } from '../../models/character/traits'

    const traits = Object.keys(char.traits)

    let remaining = traitPoints - traits.length

    function updateTraits() {
        let r = 0
        for (const trait of traits) r += char.traits[trait].score
        remaining = traitPoints - r
        console.log(char.traits)
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
                on:input={updateTraits}
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