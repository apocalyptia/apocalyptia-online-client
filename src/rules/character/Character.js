import { traitsList } from './Traits'
import { skillsList } from './Skills'


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
            this.traits = traitsList,
            this.skills = skillsList,
            this.props = {
                actions: {
                    name: `Actions`,
                    base: 1,
                    score: 1,
                    setActions: () => {
                        const actions = Math.floor((this.traits[`agility`].score + this.traits[`brains`].score) / 2)
                        this.props.actions.base = actions
                        return actions
                    }
                },
                block: {
                    name: `Block`,
                    base: 0,
                    score: 0,
                    setBlock: () => {
                        const block = this.skills[`melee`].score
                        this.props.block.base = block
                        return block
                    }
                },
                dodge: {
                    name: `Dodge`,
                    base: 0,
                    score: 0,
                    setDodge: () => {
                        const dodge = this.skills[`acrobatics`].score
                        this.props.dodge.base = dodge
                        return dodge
                    }
                },
                health: {
                    name: `Health`,
                    base: 3,
                    score: 3,
                    setHealth: () => {
                        const health = this.traits[`constitution`].score * 3
                        this.props.health.base = health
                        return health
                    }
                },
                luck: {
                    name: `Luck`,
                    base: 1,
                    score: 1,
                    setLuck: () => {
                        const luck = this.traits[`demeanor`].score
                        this.props.luck.base = luck
                        return luck
                    }
                },
                psyche: {
                    name: `Psyche`,
                    base: 1,
                    score: 1,
                    setPsyche: () => {
                        const psyche = this.traits[`demeanor`].score * 3
                        this.props.psyche.base = psyche
                        return psyche
                    }
                },
                reflex: {
                    name: `Reflex`,
                    base: 0,
                    score: 0,
                    setReflex: () => {
                        const reflex = Math.floor(this.skills[`perception`].score / 2)
                        this.props.reflex.base = reflex
                        return reflex
                    }
                },
                speed: {
                    name: `Speed`,
                    base: 2,
                    score: 2,
                    setSpeed: () => {
                        const speed = this.traits[`agility`].score + this.traits[`constitution`].score
                        this.props.speed.base = speed
                        return speed
                    }
                },
                xp: {
                    name: `Experience`,
                    base: 6,
                    score: 6,
                    setXP: () => {
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
}