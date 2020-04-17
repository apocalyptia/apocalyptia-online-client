import Accessory from '../../../classes/gear/weapons/Accessory'


export const Bayonet = new Accessory({
	name: `Bayonet`,
	desc: [
		`Counts as a Knife.`,
		`+1 Damage and Pierce for Melee Attacks.`,
	],
	sz: 1
})

export const Bipod = new Accessory({
	name: `Bipod`,
	desc: [
		`Ignore Size requirement.`,
		`1 round setup.`,
	],
	sz: 1
})

export const DrumMagazine = new Accessory({
	name: `Drum Magazine`,
	desc: [
		`Gun specific.`,
		`3x Ammo magazine capacity.`,
	],
	sz: 1
})

export const Foregrip = new Accessory({
	name: `Foregrip`,
	desc: [
		`-1 Size requirement for 2h Gun.`,
	],
	sz: 0
})

export const Holosight = new Accessory({
	name: `Holosight`,
	desc: [
		`+1 Ranged Attack.`,
	],
	sz: 0
})

export const Laser = new Accessory({
	name: `Laser`,
	desc: [
		`+1 Ranged Attack.`,
		`-6 Ranged Attack to Blind for d6 rounds.`,
	],
	sz: 0
})

export const Scope = new Accessory({
	name: `Scope`,
	desc: [
		`+3 Aimed Ranged Attacks and Perception(See).`,
	],
	sz: 1
})

export const SinglePointSling = new Accessory({
	name: `Single-Point Sling`,
	desc: [
		`Draw or stow a 2h Gun without using an Action.`,
	],
	sz: 0
})

export const Suppressor = new Accessory({
	name: `Suppressor`,
	desc: [
		`Firing a Gun does not break Concealment.`,
	],
	sz: 0
})


export default [
	Bayonet,
	Bipod,
	DrumMagazine,
	Foregrip,
	Holosight,
	Laser,
	Scope,
	SinglePointSling,
	Suppressor,
]