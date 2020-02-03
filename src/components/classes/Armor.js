import Gear from './Gear'

export default class Armor extends Gear {
	constructor({
		name,
		description,
		sz,
		dr,
		location,
		attributes=[]
	}) {
		super({
			name,
			description,
			sz
		})
		this.dr = dr
		this.location = location
		this.attributes = attributes
	}
}