import Rule from '../Rule'

export default class Gear extends Rule {
	constructor({
		name,
		description,
		sz
	}) {
		super({
			name,
			description
		})
		this.sz = sz
	}
}