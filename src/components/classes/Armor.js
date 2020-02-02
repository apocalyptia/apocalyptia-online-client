import Gear from './Gear'

export default class Armor extends Gear {
	constructor({
		name,
		description,
		sz,
		dr,
		loc,
		attributes=[]
	}) {
		super({
			name,
			description,
			sz
		})
		this.dr = dr
		this.loc = loc
		this.attributes = attributes
	}
}