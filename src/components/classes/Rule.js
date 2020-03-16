export default class Rule {
	constructor({
		name=``,
		description=[],
		subrules=[],
		visible=false,
		formula
	}) {
		this.name = name
		this.description = description
		this.subrules = subrules
		this.visible = visible,
		this.formula = formula
	}
}

