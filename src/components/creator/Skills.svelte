<script>
    import { CharacterStore } from '../../stores.js'

    let char
    let agility_visible = false
    let brains_visible = false
    let constitution_visible = false
    let demeanor_visible = false

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }
</script>

<div id="skills-section" class="sheet-section">
    <div class="section-title">
        <h2>Skills</h2>
    </div>
    <div class="remaining">
        <h3>Points Remaining: {char.skills_remaining()}</h3>
    </div>

    <div class="skill-section">
        <label class="checkbar">
            <input type="checkbox" bind:checked={agility_visible}>
            <div class="parent-trait-title">
                <span class="checkbox">
                    {#if agility_visible}
                        [-]
                    {:else}
                        [+]
                    {/if}
                </span>
                {char.traits.agility.name} Skills
            </div>
        </label>
        {#if agility_visible}
            {#each Object.entries(char.skills) as [key]}
                {#if char.traits.agility.name === char.skills[key].parent}
                    <div class="stat-block">
                        <span class="stat-label">{char.skills[key].name}</span>
                        <input
                            class="stat-input"
                            type="number"
                            min="0"
                            max="{Math.min(char.traits.agility.score, char.skills[key].score + char.skills_remaining())}"
                            on:input={change}
                            bind:value={char.skills[key].score}
                        >
                    </div>
                {/if}
            {/each}
        {/if}
    </div>

    <div class="skill-section">
        <label class="checkbar">
            <input type="checkbox" bind:checked={brains_visible}>
            <div class="parent-trait-title">
                <span class="checkbox">
                    {#if brains_visible}
                        [-]
                    {:else}
                        [+]
                    {/if}
                </span>
                {char.traits.brains.name} Skills
            </div>
        </label>
        {#if brains_visible}
            {#each Object.entries(char.skills) as [key]}
                {#if char.traits.brains.name === char.skills[key].parent}
                    <div class="stat-block">
                        <span class="stat-label">{char.skills[key].name}</span>
                        <input
                            class="stat-input"
                            type="number"
                            min="0"
                            max="{Math.min(char.traits.brains.score, char.skills[key].score + char.skills_remaining())}"
                            on:input={change}
                            bind:value={char.skills[key].score}
                        >
                    </div>
                {/if}
            {/each}
        {/if}
    </div>

    <div class="skill-section">
        <label class="checkbar">
            <input type="checkbox" bind:checked={constitution_visible}>
            <div class="parent-trait-title">
                <span class="checkbox">
                    {#if constitution_visible}
                        [-]
                    {:else}
                        [+]
                    {/if}
                </span>
                {char.traits.constitution.name} Skills
            </div>
        </label>
        {#if constitution_visible}
            {#each Object.entries(char.skills) as [key]}
                {#if char.traits.constitution.name === char.skills[key].parent}
                    <div class="stat-block">
                        <span class="stat-label">{char.skills[key].name}</span>
                        <input
                            class="stat-input"
                            type="number"
                            min="0"
                            max="{Math.min(char.traits.constitution.score, char.skills[key].score + char.skills_remaining())}"
                            on:input={change}
                            bind:value={char.skills[key].score}
                        >
                    </div>
                {/if}
            {/each}
        {/if}
    </div>

    <div class="skill-section">
        <label class="checkbar">
            <input type="checkbox" bind:checked={demeanor_visible}>
            <div class="parent-trait-title">
                <span class="checkbox">
                    {#if demeanor_visible}
                        [-]
                    {:else}
                        [+]
                    {/if}
                </span>
                {char.traits.demeanor.name} Skills
            </div>
        </label>
        {#if demeanor_visible}
            {#each Object.entries(char.skills) as [key]}
                {#if char.traits.demeanor.name === char.skills[key].parent}
                    <div class="stat-block">
                        <span class="stat-label">{char.skills[key].name}</span>
                        <input
                            class="stat-input"
                            type="number"
                            min="0"
                            max="{Math.min(char.traits.demeanor.score, char.skills[key].score + char.skills_remaining())}"
                            on:input={change}
                            bind:value={char.skills[key].score}
                        >
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
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
</style>