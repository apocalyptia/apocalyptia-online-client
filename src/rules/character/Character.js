export class Character {
    constructor() {
        this.scenario = ``,
        this.completed = false,
        this.description = {
            age: {
                label: `Age`,
                value: ``
            },
            characterName: {
                label: `Character`,
                value: ``
            },
            gender: {
                label: `Gender`,
                value: ``
            },
            hair: {
                label: `Hair`,
                value: ``
            },
            height: {
                label: `Height`,
                value: ``
            },
            playerName: {
                label: `Player`,
                value: ``
            },
            skin: {
                label: `Skin`,
                value: ``
            },
            weight: {
                label: `Weight`,
                value: ``
            },
        },
        this.traits = {
            agility: {
                name: `Agility`,
                base: 1,
                score: 1,
                max: 6
            },
            brains: {
                name: `Brains`,
                base: 1,
                score: 1,
                max: 6
            },
            constitution: {
                name: `Constitution`,
                base: 1,
                score: 1,
                max: 6
            },
            demeanor: {
                name: `Demeanor`,
                base: 1,
                score: 1,
                max: 6
            },
        },
        this.skills = {
            acrobatics: {
                name: `Acrobatics`,
                parent: `Agility`,
                base: 0,
                score: 0
            },
            athletics: {
                name: `Athletics`,
                parent: `Constitution`,
                base: 0,
                score: 0
            },
            build: {
                name: `Build`,
                parent: `Brains`,
                base: 0,
                score: 0
            },
            drive: {
                name: `Drive`,
                parent: `Constitution`,
                base: 0,
                score: 0
            },
            larceny: {
                name: `Larceny`,
                parent: `Agility`,
                base: 0,
                score: 0
            },
            leadership: {
                name: `Leadership`,
                parent: `Demeanor`,
                base: 0,
                score: 0
            },
            medicine: {
                name: `Medicine`,
                parent: `Brains`,
                base: 0,
                score: 0
            },
            melee: {
                name: `Melee`,
                parent: `Constitution`,
                base: 0,
                score: 0
            },
            perception: {
                name: `Perception`,
                parent: `Brains`,
                base: 0,
                score: 0
            },
            perform: {
                name: `Perform`,
                parent: `Demeanor`,
                base: 0,
                score: 0
            },
            ranged: {
                name: `Ranged`,
                parent: `Agility`,
                base: 0,
                score: 0
            },
            science: {
                name: `Science`,
                parent: `Brains`,
                base: 0,
                score: 0
            },
            socialize: {
                name: `Socialize`,
                parent: `Demeanor`,
                base: 0,
                score: 0
            },
            stealth: {
                name: `Stealth`,
                parent: `Agility`,
                base: 0,
                score: 0
            },
            survival: {
                name: `Survival`,
                parent: `Constitution`,
                base: 0,
                score: 0
            },
            tame: {
                name: `Tame`,
                parent: `Demeanor`,
                base: 0,
                score: 0
            },
        },
        this.props = {
            actions: {
                name: `Actions`,
                base: 1,
                score: 1,
                set: () => {
                    const actions = Math.floor((this.traits.agility.score + this.traits.brains.score) / 2)
                    this.props.actions.base = actions
                    return actions
                }
            },
            block: {
                name: `Block`,
                base: 0,
                score: 0,
                set: () => {
                    const block = this.skills.melee.score
                    this.props.block.base = block
                    return block
                }
            },
            dodge: {
                name: `Dodge`,
                base: 0,
                score: 0,
                set: () => {
                    const dodge = this.skills.acrobatics.score
                    this.props.dodge.base = dodge
                    return dodge
                }
            },
            health: {
                name: `Health`,
                base: this.traits.constitution.score * 3,
                score: 3,
                set: () => {
                    const health = this.traits.constitution.score * 3
                    this.props.health.base = health
                    return health
                }
            },
            init: {
                name: `Initiative`,
                base: 1,
                score: 1,
                set: () => {
                    const init = this.traits.agility.score
                    this.props.init.base = init
                    return init
                }
            },
            luck: {
                name: `Luck`,
                base: 1,
                score: 1,
                set: () => {
                    const luck = this.traits[`demeanor`].score
                    this.props.luck.base = luck
                    return luck
                }
            },
            psyche: {
                name: `Psyche`,
                base: 1,
                score: 1,
                set: () => {
                    const psyche = this.traits[`demeanor`].score * 3
                    this.props.psyche.base = psyche
                    return psyche
                }
            },
            reflex: {
                name: `Reflex`,
                base: 0,
                score: 0,
                set: () => {
                    const reflex = Math.floor(this.skills[`perception`].score / 2)
                    this.props.reflex.base = reflex
                    return reflex
                }
            },
            speed: {
                name: `Speed`,
                base: 2,
                score: 2,
                set: () => {
                    const speed = this.traits[`agility`].score + this.traits[`constitution`].score
                    this.props.speed.base = speed
                    return speed
                }
            },
            xp: {
                name: `Experience`,
                base: 6,
                score: 6,
                set: () => {
                    const xp = this.traits[`brains`].score * 6
                    this.props.xp.base = xp
                    return xp
                }
            },
        },
        this.abilities = [],
        this.gear = {
            armor: {
                name: `Armor`,
                inventory: []
            },
            weapons: {
                name: `Weapons`,
                inventory: []
            },
            backpack: {
                name: `Backpack`,
                inventory: []
            },
            ammo: {
                name: `Ammo`,
                inventory: []
            },
        }
    }
    updateProps() {
        let props = Object.keys(this.props)
        props.forEach((prop) => { this.props[prop].set() })
    }
}