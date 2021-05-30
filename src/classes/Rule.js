export default class Rule {
	constructor({ desc = [], name = ``, type = `Rule`, visible = false }) {
		this.desc = desc
		this.name = name
		this.type = type
		this.visible = visible
	}
}
