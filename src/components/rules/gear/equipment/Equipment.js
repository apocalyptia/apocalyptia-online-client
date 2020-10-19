import Gear from 'gear/Gear.js'


export default class Equipment extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		})
	}
}