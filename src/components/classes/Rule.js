export default class Rule {
	constructor({
		name=``,
		description=[],
		formula,
		visible=false,
	}) {
		this.name = name
		this.description = description
		this.formula = formula
		this.visible = visible
	}
}

