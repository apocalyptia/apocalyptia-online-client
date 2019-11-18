<script>
    import { CharacterStore } from '../../stores.js'

    let char

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }
</script>

<div id="traits-section" class="sheet-section">
    <div class="section-title">
        <h2>Traits</h2>
    </div>
    <div class="remaining">
        <h3>Points Remaining: {char.traits_remaining()}</h3>
    </div>
    {#each Object.entries(char.traits) as [key]}
        <div class="stat-block">
            <span class="stat-label">{char.traits[key].name}</span>
            <input
                class="stat-input"
                type="number"
                min="1"
                max="{Math.min(6, char.traits[key].score + char.traits_remaining())}"
                on:input={change}
                bind:value={char.traits[key].score}
            >
        </div>
    {/each}
</div>