import Rule from '../Rule'

export default class Gear extends Rule {
	constructor({
		name,
		desc,
		sz
	}) {
		super({
			name,
			desc
		})
		this.sz = sz
	}
}