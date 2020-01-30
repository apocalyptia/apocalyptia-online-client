import Rule from './Rule'


export default class Stat extends Rule {
	constructor({
		name,
		description,
		formula,
		base=0,
		mods=0,
		score=0
	}) {
		super({
			name,
			description,
			formula
		})
		this.base = base
		this.mods = mods
		this.score = score
	}
}