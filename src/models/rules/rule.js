export default class Rule {
    constructor(name, notes, table='', visible=false) {
        this.name = name
        this.notes = notes
        this.table = table
        this.visible = visible
    }
}