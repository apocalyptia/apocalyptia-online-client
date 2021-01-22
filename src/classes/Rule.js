export default class Rule {
	constructor({
		desc=[],
		formula=null,
		id = null,
		name=``,
		type=`Rule`,
		visible=false
	}) {
		this.id = id
		this.name = name
		this.desc = desc
		this.formula = formula
		this.type = type
		this.visible = visible
	}
}