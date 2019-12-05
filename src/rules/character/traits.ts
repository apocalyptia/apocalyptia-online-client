class Trait {
    constructor (name) {
        this.name = name,
        this.score = 1,
        this.max = 6
    }
}

export let traitsList = {
    'agility': new Trait(`Agility`),
    'brains': new Trait(`Brains`),
    'constitution': new Trait(`Constitution`),
    'demeanor': new Trait(`Demeanor`),
}

export const traitPoints = 12
