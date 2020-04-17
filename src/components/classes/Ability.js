import Rule from './Rule'

export default class Ability extends Rule {
	constructor({
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
		id=null
	}) {
		super({
			name,
			desc,
			visible,
			formula
		})
		this.max = max
		this.xp = xp
		this.taken = taken
		this.opts = opts
		this.selection = selection,
		this.notes = notes,
		this.id = id
	}
}