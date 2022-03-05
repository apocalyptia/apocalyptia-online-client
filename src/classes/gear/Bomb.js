import Gear from '$classes/Gear.js'

export default class Bomb extends Gear {
	constructor({
		attributes,
		description,
		damage,
		duration,
		fuse,
		id,
		mix,
		name,
		quantity,
		range,
		size,
		type = `Bomb`,
		url
	}) {
		url = `/bombs/${name}`
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
		this.damage = damage
		this.duration = duration
		this.fuse = fuse
		this.mix = mix
		this.range = range
	}
}
