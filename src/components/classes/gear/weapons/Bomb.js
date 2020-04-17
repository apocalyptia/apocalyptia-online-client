import Weapon from './Weapon'

export default class Bomb extends Weapon {
	constructor({
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