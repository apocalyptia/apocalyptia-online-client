<script>
    import { CharacterStore } from '../../stores.js'

    let char

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }
</script>

<div id="properties-section" class="sheet-section">
    <div class="section-title">
        <h2>Properties</h2>
    </div>
    <div class="stat-block">
        <span class="stat-label">Actions</span>
        <span class="stat-input">{char.action_points()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Speed</span>
        <span class="stat-input">{char.speed_points()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Luck</span>
        <span class="stat-input">{char.luck_points()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Experience</span>
        <span class="stat-input">{char.experience_points()}</span>
    </div>
</div>