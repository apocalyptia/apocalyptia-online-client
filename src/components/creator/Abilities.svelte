<script>
    import { CharacterStore } from '../../stores.js'

    let char

    const unsubscribe = CharacterStore.subscribe(value => { char = value })

    function change() { CharacterStore.update(char => { return char }) }

    function modifyAbilities() {
        char.abilities = [];
        AbilityList.forEach(function (ability) {
            if (ability.taken > 0) {
                char.abilities.push(ability);
            }
        })
    }

    class Ability {
        constructor(name, description, max, xp, taken, notes) {
            this.name = name;
            this.description = description;
            this.max = max;
            this.xp = xp;
            this.taken = taken;
            this.notes = notes;
        }
    }

    const AbilityList = [
        // 3 XP Abilities
        new Ability('Favorite Weapon', 'Botch is only a Fail with this one weapon.', 1, 3, 0, ""),
        new Ability('Hyper Immunity', '+1 to resist Diseases.', 3, 3, 0, ""),
        new Ability('Pack Mentality', '+1 ATK at same target a Comrade ATKs.', 1, 3, 0, ""),
        new Ability('Quick Reload', 'Free Reload once per rnd.', 1, 3, 0, ""),
        new Ability('Specialize*', '+1 to a Skill Specialty.', 1, 3, 0, ""),
        new Ability('Weapon Training*', '+1 ATK for a specific weapon.', 1, 3, 0, ""),
        // 6 XP Abilities
        new Ability('Efficient Work*', '[Time / 2] for a Skill (minimum 1 action).', 1, 6, 0, ""),
        new Ability('Fast Draw', 'Free item draw once per rnd.', 1, 6, 0, ""),
        new Ability('Fleet Footed', '+1 Speed.', 3, 6, 0, ""),
        new Ability('Multilingual*', 'Learn a different form of communication.', char.traits.brains * 3, 6, 0, ""),
        new Ability('Practice*', '+1 to a Skill (up to the parent Trait).', 1, 6, 0, ""),

        // 9 XP Abilities
        new Ability('Danger Sense', '+1 Reflex.', 1, 9, 0, ""),
        new Ability('Discipline', 'Ignore 1 Pain penalty.', 3, 9, 0, ""),
        new Ability('Fortunate', '+1 Luck.', 1, 9, 0, ""),
        new Ability('Free Running', 'Climb at [Speed] for 2AP.', 1, 9, 0, ""),
        new Ability('Unorthodox*', 'Pick a new parent Trait for a Skill.', 1, 9, 0, ""),

        // 12 XP Abilities
        new Ability('Fencing', 'Free Block roll once per rnd.', 1, 12, 0, ""),
        new Ability('Side-step', 'Free Dodge roll once per rnd.', 1, 12, 0, ""),
        new Ability('Wrestling', 'Free Grab roll once per rnd.', 1, 12, 0, ""),
        // 15 XP Abilities
        new Ability('Firm Grip', 'Use 2h weapons in 1h, up to Size 3.', 1, 15, 0, ""),
        new Ability('Hard Headed', 'Ignore Stun from Head DMG.', 1, 15, 0, ""),
        new Ability('Powerful Strike*', '+1 DMG for a specific Melee weapon.', 1, 15, 0, ""),
        // 18 XP Abilities
        new Ability('Assassin', '+3 DMG to ATKs from Concealment.', 1, 18, 0, ""),
        new Ability('Vehicle Operation*', 'Proficiently operate a class of vehicle.', 1, 18, 0, ""),
        // 24 XP Abilities
        new Ability('Ambidextrous', 'Off-hand penalty is -1 instead of -3.', 1, 24, 0, ""),
        new Ability('Tough', '+1 HP.', 3, 24, 0, ""),
        // 30 XP Abilities
        new Ability('Self Improvement*', '+1 to a Trait (max 6).', 3, 30, 0, ""),
        new Ability('Second Chance', 'Spend this Ability to avoid Death once.', 9, 30, 0, "")
    ]
</script>

<div class="sheet-section">
    <div class="section-title">
        <h2>Abilities</h2>
    </div>
    <table>
        <tr>
            <td class="large-column">Name</td>
            <td class="huge-column">Description</td>
            <td class="small-column">Max</td>
            <td class="small-column">XP</td>
            <td class="medium-column">Taken</td>
        </tr>
        {#each AbilityList as ability}
        <tr>
            <td>{ability.name}</td>
            <td>{ability.description}</td>
            <td>{ability.max}</td>
            <td>{ability.xp}</td>
            <td class="taken-column">
                <input
                    type="number"
                    max={ability.max}
                    bind:value={ability.taken}
                    on:input={modifyAbilities}
                >
            </td>
        </tr>
        {/each}
    </table>
</div>

<style>
    .small-column {
        width: 10%;
    }
    .medium-column {
        width: 15%;
    }
    .large-column {
        width: 25%;
    }
    .huge-column {
        width: 40%;
    }
    input[type="number"] {
        width: 100%;
    }
</style>