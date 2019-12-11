import Rule from '../Rule.js'

class Skill extends Rule {
	constructor(name, description, parent, difficulty, specialties=[]) {
        super(name, description)
        this.parent = parent
        this.difficulty = difficulty
        this.specialties = specialties
	}
}

class Specialty extends Rule {
    constructor(name, description) {
        super(name, description)
    }
}

new Skill(`Acrobatics`,     `Gymnastic prowess.`,   `Agility`,  6,  [
    new Specialty(`Dodge`, `Roll vs [MATK or Ranged(Throw)].`),
    new Specialty(`Jump`, `Running Jump [Speed]. Vertical [Speed x 3"].`)
])
