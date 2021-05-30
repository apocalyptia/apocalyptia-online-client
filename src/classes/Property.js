import Rule from './Rule.js'

export default class Property extends Rule {
	constructor({ desc = [], formula = [], name = ``, type = `Property`, visible = false }) {
		super({
			desc,
			name,
			type,
			visible
		})
		this.desc = desc
		this.formula = formula
		this.name = name
		this.type = type
		this.visible = visible
	}
}
