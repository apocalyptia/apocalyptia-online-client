<script>
    import { CharacterStore } from '../../stores.js'

    let char
    let visible = false

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }
</script>

<div id="traits-section" class="sheet-section">
    <label class="checkbar">
        <input type="checkbox" bind:checked={visible}>
        <div class="section-title">
            <span class="checkbox">
                {#if visible}
                    [-]
                {:else}
                    [+]
                {/if}
            </span>
            <h2>Traits</h2>
        </div>
    </label>
    {#if visible}
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
    {/if}
</div>