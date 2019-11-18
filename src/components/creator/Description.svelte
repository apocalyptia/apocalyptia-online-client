<script>
    import { CharacterStore } from '../../stores.js'

    let char

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }
</script>

<div id="description-section" class="sheet-section">
    <div class="section-title">
        <h2>Description</h2>
    </div>
    <div class="stat-block">
        <span class="stat-label">Player:</span>
        <input
            type="text"
            class="full-input"
            on:input={change}
            bind:value={char.description.playerName.value}
        >
    </div>
    <div class="stat-block">
        <span class="stat-label">Character:</span>
        <input
            type="text"
            class="full-input"
            on:input={change}
            bind:value={char.description.characterName.value}
        >
    </div>
    <div class="stat-block">
        <div class="half-stat-block">
            <span class="stat-label">Height:</span>
            <input
                type="text"
                class="half-input"
                on:input={change}
                bind:value={char.description.height.value}
            >
        </div>
        <div class="half-stat-block">
            <span class="stat-label">Weight:</span>
            <input
                type="text"
                class="half-input"
                on:input={change}
                bind:value={char.description.weight.value}
            >
        </div>
    </div>
    <div class="stat-block">
        <div class="half-stat-block">
            <span class="stat-label">Hair:</span>
            <input
                type="text"
                class="half-input"
                on:input={change}
                bind:value={char.description.hair.value}
            >
        </div>
        <div class="half-stat-block">
            <span class="stat-label">Skin:</span>
            <input
                type="text"
                class="half-input"
                on:input={change}
                bind:value={char.description.skin.value}
            >
        </div>
    </div>
    <div class="stat-block">
        <div class="half-stat-block">
            <span class="stat-label">Gender:</span>
            <input
                type="text"
                class="half-input"
                on:input={change}
                bind:value={char.description.gender.value}
            >
        </div>
        <div class="half-stat-block">
            <span class="stat-label">Age:</span>
            <input
                type="text"
                class="half-input"
                on:input={change}
                bind:value={char.description.age.value}
            >
        </div>
    </div>
</div>

<style>
    .half-stat-block {
        display: inline;
    }
    .half-input {
        width: 60px;

    }
</style>