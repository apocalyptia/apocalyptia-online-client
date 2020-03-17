import Weapon from './Weapon'

export default class Bomb extends Weapon {
	constructor({
		name,
		description,
		sz,
		dmg,
		rng,
		attributes,
		duration,
		fuse,
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
		this.duration = duration
		this.fuse = fuse
		this.mix = mix
	}
}