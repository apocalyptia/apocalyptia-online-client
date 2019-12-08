export default class Rule {
	constructor(name, notes, subrules=[], table='', visible=false) {
		this.name = name
		this.notes = notes
		this.subrules = subrules
		this.table = table
		this.visible = visible
	}
}