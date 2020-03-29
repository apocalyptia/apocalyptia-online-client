import Bomb from '../../../classes/gear/Bomb'
import {
	Blast,
	FireDamage,
	Pierce
} from '../attributes/WeaponAttributesList'
import {
	Asphyxiation,
	Blind,
	Stun
} from '../../Status'


export const FlashbangGrenade = new Bomb({
	name: `Flashbang Grenade`,
	description: [
		`Non-lethal stun grenade.`,
	],
	sz: 1,
	dmg: `0`,
	rng: `6yd`,
	attributes: [
		Blind,
		Stun,
	],
	fuse: `1 round`,
	duration: `d6 rounds`,
	mix: 9
})

export const FragGrenade = new Bomb({
	name: `Frag Grenade`,
	description: [
		`Explosive fragmentation grenade.`,
	],
	sz: 1,
	dmg: `d6x3`,
	rng: `15yd`,
	attributes: [
		Blast,
		Pierce,
	],
	fuse: `1 round`,
	duration: `instant`,
	mix: 9
})

export const MolotovCocktail = new Bomb({
	name: `Molotov Cocktail`,
	description: [
		`Glass bottle of fuel with rag wick.`,
	],
	sz: 1,
	dmg: `d6 + 1 Fire Damage/round`,
	rng: `3yd`,
	attributes: [
		Blast,
		FireDamage,
	],
	fuse: `1 round`,
	duration: `1min`,
	mix: 3
})

export const SmokeGrenade = new Bomb({
	name: `Smoke Grenade`, 
	description: [
		`Visibility denial grenade.`,
	],
	sz: 1,
	dmg: `0`,
	rng: `1yd/round`,
	attributes: [
		Blind,
	],
	fuse: `1 round`,
	duration: `d6mins`,
	mix: 6
})

export const TeargasGrenade = new Bomb({
	name: `Teargas Grenade`,
	description: [
		`Non-lethal chemical irritant grenade.`,
	],
	sz: 1,
	dmg: `1`,
	rng: `1yd/round`,
	attributes: [
		Blind,
		Stun,
		Asphyxiation,
	],
	fuse: `1 round`,
	duration: `d6mins`,
	mix: 15
})

export const Thermite = new Bomb({
	name: `Thermite`,
	description: [
		`High-temperature incendiary bomb.`,
	],
	sz: 1,
	dmg: `d6x6`,
	rng: `1yd`,
	attributes: [
		Blast,
		FireDamage,
	],
	fuse: `1 round`,
	duration: `6 rounds`,
	mix: 6
})


export default [
	FlashbangGrenade,
	FragGrenade,
	MolotovCocktail,
	SmokeGrenade,
	TeargasGrenade,
	Thermite,
]



// OLD BOMBS
// new Bomb(`Chlorine`,	18, `toxin`,	`1yd/round`,  `d6+3mins`, `Blind. Asphyxiation x2. Stun.`, 1)
// new Bomb(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
// new Bomb(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10 round fuse.`,				  1)
// new Bomb(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3 rounds`, `Mimics sound of gunfire.`,	 0)
// new Bomb(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
// new Bomb(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. Range:50. Blind.`,	  1)

