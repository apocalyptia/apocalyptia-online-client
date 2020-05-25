export default class Rule {
	constructor({
		id = null,
		name=``,
		desc=[],
		formula,
		visible=false
	}) {
		this.id = id
		this.name = name
		this.desc = desc
		this.formula = formula
		this.visible = visible
	}
}