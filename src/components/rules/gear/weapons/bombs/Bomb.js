import Weapon from 'gear/weapons/Weapon.js'

export default class Bomb extends Weapon {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
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
			qty,
			dmg,
			rng,
			attr
		})
		this.dur = dur
		this.fuse = fuse
		this.mix = mix
	}
}