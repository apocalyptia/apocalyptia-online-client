<script>
    import { CharacterStore } from '../../stores.js'

    let char

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }
</script>

<div id="health-section" class="sheet-section">
    <div class="section-title">
        <h2>Health</h2>
    </div>
    <div class="stat-block">
        <span class="three-column">Current:</span>
        <input
            type="number"
            class="stat-input three-column"
            value={char.set_health()}
            min=0
            max={char.set_health()}
        >
        <span class="stat-input three-column">{char.traits.constitution.score*3}</span>
    </div>
    <div class="stat-block">
        <span class="three-column">Pain:</span>
        <span class="stat-input three-column">{char.traits.constitution.score*3}</span>
        <span class="stat-input three-column">{char.traits.constitution.score*3}</span>
    </div>
    <div class="stat-block">
        <span class="three-column">Psyche:</span>
        <input
            type="number"
            class="stat-input three-column"
            value={char.set_psyche()}
            min=0
            max={char.set_psyche()}
        >
        <span class="stat-input three-column">{char.traits.demeanor.score*3}</span>
    </div>
</div>
