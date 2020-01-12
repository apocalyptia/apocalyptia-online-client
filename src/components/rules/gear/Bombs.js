import { Weapon } from '../Gear'
import {
	Blast,
	FDMG,
	Pierce
} from '../gear/WeaponAttributes'
import {
	Blind,
	Stun,
	Suffocation
} from '../Situations'


class Bomb extends Weapon {
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


export const Flashbang = new Bomb({
	name: `Flashbang`,
	sz: 1,
	dmg: `0`,
	rng: `6yd`,
	attributes: [
		Blind,
		Stun
	],
	fuse: `1rnd`,
	duration: `d6rnds`,
	mix: 9
})

export const Frag = new Bomb({
	name: `Frag`,
	sz: 1,
	dmg: `d6x3`,
	rng: `15yd`,
	attributes: [
		Blast,
		Pierce
	],
	fuse: `1rnd`,
	duration: `instant`,
	mix: 9
})

export const Molotov = new Bomb({
	name: `Molotov`,
	sz: 2,
	dmg: `d6 + 1FDMG/rnd`,
	rng: `3yd`,
	attributes: [
		Blast,
		FDMG
	],
	fuse: `1rnd`,
	duration: `1min`,
	mix: 3
})

export const Smoke = new Bomb({
	name: `Smoke`, 
	sz: 1,
	dmg: `0`,
	rng: `1yd/rnd`,
	attributes: [
		Blind
	],
	fuse: `1rnd`,
	duration: `d6mins`,
	mix: 6
})

export const Teargas = new Bomb({
	name: `Teargas`,
	sz: 1,
	dmg: `1`,
	rng: `1yd/rnd`,
	attributes: [
		Blind,
		Stun,
		Suffocation
	],
	fuse: `1rnd`,
	duration: `d6mins`,
	mix: 15
})

export const Thermite = new Bomb({
	name: `Thermite`,
	sz: 1,
	dmg: `d6x6`,
	rng: `1yd`,
	attributes: [
		Blast,
		FDMG
	],
	fuse: `1rnd`,
	duration: `6rnds`,
	mix: 6
})


export const BombList = [
	Flashbang,
	Frag,
	Molotov,
	Smoke,
	Teargas,
	Thermite
]

// OLD BOMBS
// new Bomb(`Chlorine`,	18, `toxin`,	`1yd/rnd`,  `d6+3mins`, `Blind. Suffocation x2. Stun.`, 1)
// new Bomb(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
// new Bomb(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10rnd fuse.`,				  1)
// new Bomb(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3rnds`, `Mimics sound of gunfire.`,	 0)
// new Bomb(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
// new Bomb(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. RNG:50. Blind.`,	  1)

