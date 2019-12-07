<script>
    import { CharacterStore } from '../../rules/Stores'
    let char
    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    const traits = Object.keys(char.traits)
    const skills = Object.keys(char.skills)

    let startingSkillPoints = char.traits.brains.score * 3
    let remaining = startingSkillPoints

    function countSkillPoints() {
        let skillCount = 0
        skills.forEach((skill) => { skillCount += char.skills[skill].score })
        remaining = startingSkillPoints - skillCount
        char.updateProps()
    }
</script>

<div class='step'>
    <div class='step-title'>
        <h2>Skills</h2>
    </div>
    <div class='remaining'>
        <h3>Points Remaining: {remaining}</h3>
    </div>
    {#each traits as trait}
        <div class='skill-section'>
            <div class='parent-trait-title'>
                {char.traits[trait].name} Skills
            </div>
            {#each skills as skill}
                {#if char.traits[trait].name == char.skills[skill].parent}
                    <div class='stat-block'>
                        <span class='stat-label'>{char.skills[skill].name}</span>
                        <input
                            class='stat-input'
                            type='number'
                            min='0'
                            max='{Math.min(char.traits[trait].score, (char.skills[skill].score + remaining))}'
                            on:input={countSkillPoints}
                            bind:value={char.skills[skill].score}
                        >
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    .skill-section{
        border: 1px dashed var(--char-color);
		margin: 20px 5px 20px 5px;
        padding: 0 10px 10px 10px;
    }
    .parent-trait-title {
        margin-bottom: 10px;
    }
    .remaining {
        margin-left: 2rem;
    }
</style>