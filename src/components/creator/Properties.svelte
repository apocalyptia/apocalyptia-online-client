<script>
    import { CharacterStore } from '../../data/stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })
</script>

<div class="step">
    <div class="step-title">
        <h2>Properties</h2>
    </div>
    <div class="stat-block">
        <span class="three-column">Health:</span>
        <input
            type="number"
            class="three-column"
            value={char.props.health.setHealth()}
            min=0
            max={char.props.health.score}
        >
        <span class="three-column">{char.props.health.score}</span>
    </div>
    <div class="stat-block">
        <span class="three-column">Pain:</span>
        <input
            type="number"
            class="three-column"
            value=0
            min=0
            max={char.props.health.score}
        >
        <span class="three-column">{Math.floor(char.props.health.base/2)}</span>
    </div>
    <div class="stat-block">
        <span class="three-column">Psyche:</span>
        <input
            type="number"
            class="three-column"
            value={char.props.psyche.setPsyche()}
            min=0
            max={char.props.psyche.score}
        >
        <span class="three-column">{char.props.psyche.score}</span>
    </div>

    <div class="stat-block">
        <span class="three-column">
            <span class="stat-label">Reflex:</span>
            <span class="stat-input">{char.props.reflex.setReflex()}</span>
        </span>
        <span class="three-column">
            <span class="stat-label">Block:</span>
            <span class="stat-input">{char.props.block.setBlock()}</span>
        </span>
        <span class="three-column">
            <span class="stat-label">Dodge:</span>
            <span class="stat-input">{char.props.dodge.setDodge()}</span>
        </span>
    </div>

    <div class="stat-block">
        <span class="stat-label">Actions:</span>
        <span class="stat-input">{char.props.actions.setActions()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Speed:</span>
        <span class="stat-input">{char.props.speed.setSpeed()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Luck:</span>
        <span class="stat-input">{char.props.luck.setLuck()}</span>
    </div>
    <div class="stat-block">
        <span class="stat-label">Experience:</span>
        <span class="stat-input">{char.props.xp.setXP()}</span>
    </div>
</div>