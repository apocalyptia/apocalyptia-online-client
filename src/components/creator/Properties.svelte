<script>
    import { CharacterStore } from '../../rules/Stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    const props = Object.keys(char.props)
</script>

<div class='step'>
    <div class='step-title'>
        <h2>Properties</h2>
    </div>
    {#each props as prop}
        <div class='stat-block'>
            <span class='stat-label'>{char.props[prop].name}:</span>
            <span class='stat-label'>{char.props[prop].base}</span>
        </div>
    {/each}
</div>

    <!-- <div class='stat-block'>
        <span class='three-column'>Health:</span>
        <input
            type='number'
            class='three-column'
            value={char.props.health.setHealth()}
            min=0
            max={char.props.health.score}
        >
        <span class='three-column'>{char.props.health.score}</span>
    </div>
    -->