import Rule from './Rule'


export default class Stat extends Rule {
	constructor({
		name,
		description,
		base=1,
		mods=0,
		score=1
	}) {
		super({
			name,
			description
		})
		this.base = base
		this.mods = mods
		this.score = score
	}
}