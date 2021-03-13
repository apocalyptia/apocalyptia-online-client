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
		qty=0,
		type=`Ability`,
		visible,
		experience
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
		this.experience = experience
		this.qty = qty
		this.opts = opts
		this.selection = selection
		this.notes = notes
	}
	static text = [
		`Abilities are Character upgrades purchased with XP.`
	]
}