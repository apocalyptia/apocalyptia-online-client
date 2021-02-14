import Rule from 'classes/Rule.js'

export default class Ability extends Rule {
	constructor({
		desc,
		formula,
		id,
		max,
		name,
		notes=``,
		opts=[],
		selection=0,
		taken=0,
		type=`Ability`,
		visible,
		xp
	}) {
		super({
			id,
			name,
			desc,
			visible,
			formula,
			type
		})
		this.max = max
		this.xp = xp
		this.taken = taken
		this.opts = opts
		this.selection = selection
		this.notes = notes
	}
	static text = [
		`Abilities are Character upgrades purchased with XP.`
	]
}