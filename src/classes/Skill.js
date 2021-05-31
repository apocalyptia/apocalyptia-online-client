import Rule from '/src/classes/Rule.js'

export default class Skill extends Rule {
	constructor({
		desc,
		diff = null,
		name,
		parent = ``,
		specs = {},
		type = `Skill`,
		url,
		visible
	}) {
		url = `/skills/${name}`
		super({
			desc,
			name,
			type,
			url,
			visible
		})
		this.diff = diff
		this.parent = parent
		this.specs = specs
	}
}
