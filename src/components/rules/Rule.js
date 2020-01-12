export default class Rule {
	constructor({
		name=``,
		description=[``],
		subrules=[],
		table=null,
		visible=false,
		formula=null
	}) {
		this.name = name
		this.description = description
		this.subrules = subrules
		this.table = table
		this.visible = visible,
		this.formula = formula
	}
}

