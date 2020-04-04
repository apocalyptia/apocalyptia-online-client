import MeleeWeapon from '../../../classes/gear/MeleeWeapon'
import {
	Chop,
	Blunt,
	OneHanded,
	Pierce,
	Rapid,
	Shield,
	Slow,
	TwoHanded
} from '../attributes/WeaponAttributesList'
import { Unarmed } from '../../Status'


export const Ax = new MeleeWeapon({
	name: `Ax`,
	sz: 4,
	dmg: 4,
	rng: 2,
	attributes: [
		TwoHanded,
		Chop,
		Slow,
	]
})

export const BaseballBat = new MeleeWeapon({
	name: `Baseball Bat`,
	sz: 3,
	dmg: 3,
	rng: 2,
	attributes: [
		TwoHanded,
		Blunt,
	]
})

export const BrassKnuckles = new MeleeWeapon({
	name: `Brass Knuckles`,
	sz: 1,
	dmg: 1,
	rng: 1,
	attributes: [
		OneHanded,
		Blunt,
		Unarmed,
	]
})

export const Club = new MeleeWeapon({
	name: `Club`,
	sz: 2,
	dmg: 2,
	rng: 2,
	attributes: [
		OneHanded,
		Blunt,
	]
})

export const Crowbar = new MeleeWeapon({
	name: `Crowbar`,
	sz: 3,
	dmg: 3,
	rng: 2,
	attributes: [
		OneHanded,
	]
})

export const Hammer = new MeleeWeapon({
	name: `Hammer`,
	sz: 2,
	dmg: 2,
	rng: 1,
	attributes: [
		OneHanded,
		Blunt,
	]
})

export const Hatchet = new MeleeWeapon({
	name: `Hatchet`,
	sz: 2,
	dmg: 2,
	rng: 1,
	attributes: [
		OneHanded,
		Chop,
	]
})

export const Knife = new MeleeWeapon({
	name: `Knife`,
	sz: 1,
	dmg: 1,
	rng: 1,
	attributes: [
		OneHanded,
		Pierce,
		Rapid,
	]
})

export const Machete = new MeleeWeapon({
	name: `Machete`,
	sz: 2,
	dmg: 3,
	rng: 2,
	attributes: [
		OneHanded,
		Chop,
	]
})

export const RiotShield = new MeleeWeapon({
	name: `Riot Shield`,
	sz: 4,
	dmg: 0,
	rng: 1,
	attributes: [
		OneHanded,
		Blunt,
		Shield,
	]
})

export const Sledgehammer = new MeleeWeapon({
	name: `Sledgehammer`,
	sz: 5,
	dmg: 4,
	rng: 2,
	attributes: [
		TwoHanded,
		Blunt,
		Slow,
	]
})

export const Spear = new MeleeWeapon({
	name: `Spear`,
	sz: 3,
	dmg: 4,
	rng: 3,
	attributes: [
		TwoHanded,
		Pierce,
	]
})

export const Staff = new MeleeWeapon({
	name: `Staff`,
	sz: 3,
	dmg: 2,
	rng: 3,
	attributes: [
		TwoHanded,
		Blunt,
	]
})


export default [
	Ax,
	BaseballBat,
	BrassKnuckles,
	Club,
	Crowbar,
	Hammer,
	Hatchet,
	Knife,
	Machete,
	RiotShield,
	Sledgehammer,
	Spear,
	Staff,
]


// RARE MELEE
// new MeleeWeapon(`Barbwire Club`, 3, 1, ``, 2),
// new MeleeWeapon(`Bowie Knife`, 2, 1, `Chop. Rapid.`, 1),
// new MeleeWeapon(`Broadsword`, 4, 2, `Chop or Pierce.`, 4),
// new MeleeWeapon(`Catch Pole`, 0, 2, `+1 Block. Blunt. +1 Grab.`, 3),
// new MeleeWeapon(`Chainsaw`, 6, 2, `.5gal Fuel. d6 rounds to start. 1: Empty. Loud.`, 4),
// new MeleeWeapon(`Ice Ax`, 3, 1, `Lever. Pierce.`, 2),
// new MeleeWeapon(`Katana`, 5, 2, `Chop or Pierce. Rapid.`, 3),
// new MeleeWeapon(`Kukri`, 3, 1, `Chop`, 2),
// new MeleeWeapon(`Lasso`, 0, 2, `Blunt. +1 Grab. Throw (Range:3)`, 2),
// new MeleeWeapon(`Net`, 0, 2, `+6 Grab.`, 3),
// new MeleeWeapon(`Rapier`, 3, 1, `Pierce. Rapid.`, 2),
// new MeleeWeapon(`Scythe`, 6, 2, `Chop. Pierce.`, 4),
// new MeleeWeapon(`Sign Shield`, 2, 1, `+3 Block. Cover 6 Damage Resistance.`, 4),
// new MeleeWeapon(`Switchblade`, 1, 1, `Pierce. Rapid.`, 0),
// new MeleeWeapon(`Trench Knife`, 2, 1, `Blunt Punch. Pierce. Rapid.`, 1),
// new MeleeWeapon(`Whip`, 0, 1, `Blunt. +1 Disarm. +1 Grab. Range:3.`, 1),

// OLD MELEE
// new MeleeWeapon(`Baton`, 2, 1, `Blunt. Rapid.`, 2),
// new MeleeWeapon(`Cane`, 1, 1, `Blunt. +1 Trip. Can be used as a Crutch.`, 3),
// new MeleeWeapon(`Cleaver`, 2, 1, `Chop.`, 1),
// new MeleeWeapon(`Firepoker`, 3, 1, `Lever. Pierce.`, 3),
// new MeleeWeapon(`Garrote`, 1, 2, `Blunt. +3 to Grab(Lock) Head.`, 1),
// new MeleeWeapon(`Metal Club`, 3, 2, `Blunt.`, 3),
// new MeleeWeapon(`Pickax`, 6, 2, `Lever. Pierce.`, 5),
// new MeleeWeapon(`Pitchfork`, 3, 2, `+1 Block. Pierce.`, 4),
// new MeleeWeapon(`Screwdriver`, 1, 1, `Lever. Pierce. Rapid.`, 1),
// new MeleeWeapon(`Shovel`, 3, 2, `+1 Block`, 4),
// new MeleeWeapon(`Tire Iron`, 2, 1, `Lever.`, 2),
// new MeleeWeapon(`Torch`, 1, 1, `Blunt. +1 Fire Damage. 5yd light radius 1hr.`, 2),