import Rule from '/src/classes/Rule.js'

export default class Specialty extends Rule {
	constructor({
		desc,
		diff = null,
		name,
		parent = ``,
		type = `Specialty`,
		visible
	}) {
		super({
			desc,
			name,
			type,
			visible
		})
		this.diff = diff
		this.parent = parent
	}
}
