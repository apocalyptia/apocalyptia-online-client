import Rule from '../Rule'

export default class Gear extends Rule {
	constructor({
		id,
		name,
		desc,
		sz
	}) {
		super({
			id,
			name,
			desc
		})
		this.sz = sz
	}
}