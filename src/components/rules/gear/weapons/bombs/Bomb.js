import Weapon from '../Weapon'

export default class Bomb extends Weapon {
	constructor({
		id,
		name,
		desc,
		sz,
		dmg,
		rng,
		attr,
		dur,
		fuse,
		mix
	}) {
		super({
			id,
			name,
			desc,
			sz,
			dmg,
			rng,
			attr
		})
		this.dur = dur
		this.fuse = fuse
		this.mix = mix
	}
}