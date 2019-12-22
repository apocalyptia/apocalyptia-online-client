export default class Rule {
	constructor(name, description, subrules=[], table='', visible=false) {
		this.name = name
		this.description = description
		this.subrules = subrules
		this.table = table
		this.visible = visible
	}
}

