import Weapon from './Weapon'

export default class Bomb extends Weapon {
	constructor({
		name,
		description,
		sz,
		dmg,
		rng,
		attributes,
		fuse,
		duration,
		mix
	}) {
		super({
			name,
			description,
			sz,
			dmg,
			rng,
			attributes
		})
		this.fuse = fuse
		this.duration = duration
		this.mix = mix
	}
}