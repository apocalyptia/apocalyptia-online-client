class Skill {
    constructor(name, parent) {
        this.name = name,
        this.parent = parent,
        this.score = 0
    }
}

export let skillsList = {
    'acrobatics': new Skill(`Acrobatics`, `Agility`),
    'athletics': new Skill(`Athletics`, `Constitution`),
    'build': new Skill(`Build`, `Brains`),
    'drive': new Skill(`Drive`, `Constitution`),
    'larceny': new Skill(`Larceny`, `Agility`),
    'leadership': new Skill(`Leadership`, `Demeanor`),
    'medicine': new Skill(`Medicine`, `Brains`),
    'melee': new Skill(`Melee`, `Constitution`),
    'perception': new Skill(`Perception`, `Brains`),
    'perform': new Skill(`Perform`, `Demeanor`),
    'ranged': new Skill(`Ranged`, `Agility`),
    'science': new Skill(`Science`, `Brains`),
    'socialize': new Skill(`Socialize`, `Demeanor`),
    'stealth': new Skill(`Stealth`, `Agility`),
    'survival': new Skill(`Survival`, `Constitution`),
    'tame': new Skill(`Tame`, `Demeanor`),
}