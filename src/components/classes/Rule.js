export default class Rule {
	constructor({
		name=``,
		desc=[],
		formula,
		visible=false,
	}) {
		this.name = name
		this.desc = desc
		this.formula = formula
		this.visible = visible
	}
}

