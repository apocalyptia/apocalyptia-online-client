import Gear from './Gear'

export default class CombatGear extends Gear {
	constructor({
		name,
		description,
		sz,
		attributes=[]
	}) {
		super({
			name,
			description,
			sz
		})
		this.attributes = attributes
	}
}