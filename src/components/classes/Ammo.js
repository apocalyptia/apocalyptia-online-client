import Gear from './Gear'

export default class Ammo extends Gear {
	constructor({
		name,
		description,
		sz,
		cal=``,
		attributes=[]
	}) {
		super({
			name,
			description,
			sz
		})
		this.cal = cal
		this.attributes = attributes
	}
}