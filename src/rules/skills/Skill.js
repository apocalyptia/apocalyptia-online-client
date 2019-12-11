import Rule from '../Rule.js'

export class Skill extends Rule {
	constructor(name, description, parent, difficulty, specialties=[]) {
        super(name, description)
        this.parent = parent
        this.difficulty = difficulty
        this.specialties = specialties
	}
}

export class Specialty extends Rule {
    constructor(name, description) {
        super(name, description)
    }
}