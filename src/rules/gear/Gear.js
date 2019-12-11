import Rule from '../Rule.js'

export default class Gear extends Rule {
    constructor(name, description, sz) {
        super(name, description)
        this.sz = sz
    }
}