<script>
    import { CharacterStore } from '../../stores.js'

    let char

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }
</script>

<div id="defenses-section" class="sheet-section">
    <div class="section-title">
        <h2>Defenses</h2>
    </div>
    <div class="stat-block">
        <span class="stat-label">Reflex</span>
        <span class="stat-input">{char.reflex_score()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Block</span>
        <span class="stat-input">{char.block_score()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Dodge</span>
        <span class="stat-input">{char.dodge_score()}</span>
    </div>
</div>