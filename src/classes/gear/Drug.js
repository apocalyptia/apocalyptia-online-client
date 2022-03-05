import Gear from '$classes/Gear.js'

export default class Drug extends Gear {
	constructor({
		attributes,
		description,
		id,
		mix,
		name,
		overdose,
		quantity,
		size,
		type = `Drug`,
		url
	}) {
		url = `/drugs/${name}`
		super({
			attributes,
			description,
			id,
			name,
			quantity,
			size,
			type,
			url
		})
		this.mix = mix
		this.overdose = overdose
	}
}
