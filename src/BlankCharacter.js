class Character {
    constructor() {
        this.scenario = '',
        this.completed = false,
        this.description = {
            playerName: {
                label: "Player",
                value: ""
            },
            characterName: {
                label: "Character",
                value: ""
            },
            height: {
                label: "Height",
                value: ""
            },
            weight: {
                label: "Weight",
                value: ""
            },
            hair: {
                label: "Hair",
                value: ""
            },
            skin: {
                label: "Skin",
                value: ""
            },
            gender: {
                label: "Gender",
                value: ""
            },
            age: {
                label: "Age",
                value: ""
            }
        },
        this.traits = {
            agility: { name: "Agility", base: 1, score: 1 },
            brains: { name: "Brains", base: 1, score: 1 },
            constitution: { name: "Constitution", base: 1, score: 1 },
            demeanor: { name: "Demeanor", base: 1, score: 1 }
        },
        this.skills = {
            build: { name: "Build", parent: "Constitution", base: 0, score: 0, max: 1},
            drive: { name: "Drive", parent: "Constitution", base: 0, score: 0, max: 1 },
            leadership: { name: "Leadership", parent: "Demeanor", base: 0, score: 0, max: 1 },
            manipulate: { name: "Manipulate", parent: "Agility", base: 0, score: 0, max: 1 },
            medicine: { name: "Medicine", parent: "Brains", base: 0, score: 0, max: 1 },
            melee: { name: "Melee", parent: "Constitution", base: 0, score: 0, max: 1 },
            perform: { name: "Perform", parent: "Demeanor", base: 0, score: 0, max: 1 },
            ranged: { name: "Ranged", parent: "Agility", base: 0, score: 0, max: 1 },
            science: { name: "Science", parent: "Brains", base: 0, score: 0, max: 1 },
            stealth: { name: "Stealth", parent: "Agility", base: 0, score: 0, max: 1 },
            survival: { name: "Survival", parent: "Brains", base: 0, score: 0, max: 1 },
            tame: { name: "Tame", parent: "Demeanor", base: 0, score: 0, max: 1 }
        },
        this.properties = {
            actions: { name: "Actions", base: 2, score: 2 },
            perception: { name: "Perception", base: 1, score: 1 },
            luck: { name: "Luck", base: 1, score: 1 },
            xp: { name: "Experience", base: 6, score: 6 },
            speed: { name: "Speed", base: 2, score: 2 }
        },
        this.defenses = {
            block: { name: "Block", base: 0, score: 0 },
            dodge: { name: "Dodge", base: 0, score: 0 },
            reflex: { name: "Reflex", base: 0, score: 0 }
        },
        this.abilities = [],
        this.gear = {
            armor: {
                name: "Armor",
                inventory: []
            },
            weapons: {
                name: "Weapons",
                inventory: []
            },
            backpack: {
                name: "Backpack",
                inventory: []
            },
            ammo: {
                name: "Ammo",
                inventory: []
            }
        },
        this.traits_remaining = () => {
            return 12 -
            this.traits.agility.score -
            this.traits.brains.score -
            this.traits.constitution.score -
            this.traits.demeanor.score
        },
        this.skills_remaining = () => {
            return (this.traits.brains.score * 6) -
            this.skills.manipulate.score -
            this.skills.ranged.score -
            this.skills.stealth.score -
            this.skills.medicine.score -
            this.skills.science.score -
            this.skills.survival.score -
            this.skills.build.score -
            this.skills.drive.score -
            this.skills.melee.score -
            this.skills.leadership.score -
            this.skills.perform.score -
            this.skills.tame.score
        },
        this.set_health = () => {
            return this.traits.constitution.score * 3;
        }
        this.set_psyche = () => {
            return this.traits.demeanor.score * 3;
        }
        this.action_points = () => {
            return Math.floor(
                (
                    this.traits.agility.score +
                    this.traits.brains.score
                ) / 2
            );
        },
        this.perception_score = () => {
            return this.traits.brains.score
        },
        this.luck_points = () => {
            return this.traits.demeanor.score
        },
        this.experience_points = () => {
            return this.traits.brains.score * 6
        },
        this.speed_points = () => {
            return this.traits.agility.score + this.traits.constitution.score
        },
        this.reflex_score = () => {
            return Math.round(this.traits.brains.score / 2)
        },
        this.dodge_score = () => {
            return this.traits.agility.score
        },
        this.block_score = () => {
            return this.skills.melee.score
        }
    }
}

export default Character