import Rule from './Rule.js'

export class Gear extends Rule {
    constructor(name, description, sz) {
        super(name, description)
        this.sz = sz
    }
}