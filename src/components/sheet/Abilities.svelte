<script>
    import { CharacterStore } from '../../stores'

    let char
    let visible = false

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }

    class Ability {
        constructor(name, notes, max, xp) {
            this.name = name;
            this.notes = notes;
            this.max = max;
            this.xp = xp;
        }
    }

    const AbilityList = [
        new Ability('Charismatic', '+1 Socialize for First Impressions.', 3, 3),
        new Ability('Favorite Weapon', 'Botch is only a Fail with this one weapon.', 1, 3),
        new Ability('Hyper Immunity', '+1 to resist Diseases and Drugs.', 3, 3),
        new Ability('Pack Mentality', '+1 ATK at same target a Comrade ATKs.', 1, 3),
        new Ability('Specialize*', '+1 to a specific Skill Specialty.', 1, 3),
        new Ability('Vendetta', '+1 ATK against members of one Faction.', 1, 3),
        new Ability('Discipline', 'Ignore 1 Pain penalty.', 3, 6),
        new Ability('Efficient Work*', '[Time / 2] for a Skill (minimum 1 action).', 1, 6),
        new Ability('Fast Draw', 'Free weapon draw once per rnd.', 1, 6),
        new Ability('Fleet Footed', '+1 Speed.', 3, 6),
        new Ability('Quick Reload', 'Free Reload once per rnd.', 1, 6),
        new Ability('Weapon Training*', '+1 ATK for a specific weapon.', 1, 6),
        new Ability('Danger Sense', '+1 Reflex.', 1, 9),
        new Ability('Fortunate', '+1 Luck.', 1, 9),
        new Ability('Free Running', 'Climb at [Speed] for 2AP.', 1, 9),
        new Ability('Hone Instinct*', '+1 to a specific Instinct.', 1, 9),
        new Ability('Multilingual*', 'Learn a different form of communication.', 1, 9),
        new Ability('Unorthodox*', 'Pick a new parent Trait for a specific Skill.', 1, 9),
        new Ability('Fencing', 'Free Block roll once per rnd.', 1, 12),
        new Ability('Martial Arts', 'Free Grab roll once per rnd.', 1, 12),
        new Ability('Side-step', 'Free Dodge roll once per rnd.', 1, 12),
        new Ability('Firm Grip', 'Use 2h weapons in 1h, up to Size 3.', 1, 15),
        new Ability('Hard Headed', 'Ignore Stun from Head DMG.', 1, 15),
        new Ability('Powerful Strike*', '+1 DMG for a specific Melee weapon.', 1, 15),
        new Ability('Assassin', '+3 DMG from Concealment.', 1, 18),
        new Ability('Vehicle Operation*', 'Proficiently operate a complex vehicle.', 1, 18),
        new Ability('Ambidextrous', 'Off-hand penalty is -1 instead of -3.', 1, 24),
        new Ability('Tough', '+1 HP.', 3, 24),
        new Ability('Self Improvement*', '+1 to a Trait (max 6).', 3, 30),
        new Ability('Second Chance', 'Spend this Ability to avoid Death once.', 9, 30)
    ]
</script>

<div id="abilities-section" class="sheet-section">
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
            <h2>Abilities</h2>
        </div>
    </label>
    {#if visible}
        {#each char.abilities as ability}
            <div class="stat-block">
                {ability.name}: {ability.notes}
                <div>
                    <span>Max: {ability.max}</span>
                    <span>XP: {ability.xp}</span>
                </div>
            </div>
        {/each}
    {/if}
</div>