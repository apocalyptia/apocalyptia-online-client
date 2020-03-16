import Attribute from './Attribute'

export default class AmmoAttribute extends Attribute {
	constructor({
		name,
		description,
		calibers
	}) {
		super({
			name,
			description
		})
		this.calibers = calibers
	}
}