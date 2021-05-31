import Rule from '/src/classes/Rule.js'

export default class Gear extends Rule {
	constructor({
		attr = [],
		desc,
		id,
		name,
		qty = 0,
		sz = 0,
		type = `Gear`,
		url
	}) {
		url = `/gear${url}`
		super({
			desc,
			id,
			name,
			type,
			url
		})
		this.attr = attr
		this.qty = qty
		this.sz = sz
	}
}
