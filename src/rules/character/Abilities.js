class Ability {
    constructor(name, description, max, xp, taken, notes) {
        this.name = name
        this.description = description
        this.max = max
        this.xp = xp
        this.taken = taken
        this.notes = notes
    }
}

export const AbilityList = [
    // 3 XP Abilities
    new Ability(`Favorite Weapon`,      `Botch is only a Fail with this one weapon.`,   1, 3, 0, ``),
    new Ability(`Hyper Immunity`,       `+1 to resist Diseases.`,                       3, 3, 0, ``),
    new Ability(`Pack Mentality`,       `+1 ATK at same target a Comrade ATKs.`,        1, 3, 0, ``),
    new Ability(`Quick Reload`,         `Free Reload once per rnd.`,                    1, 3, 0, ``),
    new Ability(`Specialize*`,          `+1 to a Skill Specialty.`,                     1, 3, 0, ``),
    new Ability(`Weapon Training*`,     `+1 ATK for a specific weapon.`,                1, 3, 0, ``),
    // 6 XP Abilities
    new Ability(`Efficient Work*`,      `[Time / 2] for a Skill (minimum 1 action).`,   1, 6, 0, ``),
    new Ability(`Fast Draw`,            `Free item draw once per rnd.`,                 1, 6, 0, ``),
    new Ability(`Fleet Footed`,         `+1 Speed.`,                                    3, 6, 0, ``),
    new Ability(`Multilingual*`,        `Learn a different form of communication.`,     9, 6, 0, ``),
    new Ability(`Practice*`,            `+1 to a Skill (up to the parent Trait).`,      1, 6, 0, ``),
    // OPEN SLOT FOR NEW ABILITY
    // 9 XP Abilities
    new Ability(`Danger Sense`,         `+1 Reflex.`,                                   1, 9, 0, ``),
    new Ability(`Discipline`,           `Ignore 1 Pain penalty.`,                       3, 9, 0, ``),
    new Ability(`Fortunate`,            `+1 Luck.`,                                     1, 9, 0, ``),
    new Ability(`Free Running`,         `Acrobatics 9# to Climb as a Run action.`,      1, 9, 0, ``),
    new Ability(`Unorthodox*`,          `Pick a new parent Trait for a Skill.`,         1, 9, 0, ``),
    // OPEN SLOT FOR NEW ABILITY
    // 12 XP Abilities
    new Ability(`Fencing`,              `Free Block roll once per rnd.`,                1, 12, 0, ``),
    new Ability(`Side-step`,            `Free Dodge roll once per rnd.`,                1, 12, 0, ``),
    new Ability(`Wrestling`,            `Free Grab roll once per rnd.`,                 1, 12, 0, ``),
    // 15 XP Abilities
    new Ability(`Firm Grip`,            `Use 2h weapons in 1h, up to Size 3.`,          1, 15, 0, ``),
    new Ability(`Hard Headed`,          `Ignore Stun from Head DMG.`,                   1, 15, 0, ``),
    new Ability(`Powerful Strike*`,     `+1 DMG for a specific Melee weapon.`,          1, 15, 0, ``),
    // 18 XP Abilities
    new Ability(`Assassin`,             `+3 DMG to ATKs from Concealment.`,             1, 18, 0, ``),
    new Ability(`Vehicle Operation*`,   `Proficiently operate a class of vehicle.`,     1, 18, 0, ``),
    // 24 XP Abilities
    new Ability(`Ambidextrous`,         `Off-hand penalty is -1 instead of -3.`,        1, 24, 0, ``),
    new Ability(`Tough`,                `+1 Health.`,                                   3, 24, 0, ``),
    // 30 XP Abilities
    new Ability(`Self Improvement*`,    `+1 to a Trait (max 6).`,                       3, 30, 0, ``),
    new Ability(`Second Chance`,        `Spend this Ability to avoid Death once.`,      9, 30, 0, ``)
]