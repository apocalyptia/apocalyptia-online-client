import Rule from 'rules/Rule.js'

export default class Ability extends Rule {
	constructor({
		id,
		name,
		desc,
		formula,
		visible,
		max,
		xp,
		taken=0,
		opts=[],
		selection=0,
		notes=``,
	}) {
		super({
			id,
			name,
			desc,
			visible,
			formula,
		})
		this.max = max
		this.xp = xp
		this.taken = taken
		this.opts = opts
		this.selection = selection,
		this.notes = notes
	}
}