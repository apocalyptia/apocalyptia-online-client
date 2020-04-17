import Ammo from '../../../classes/gear/weapons/Ammo'
import {
	Broadhead,
	HollowPoint,
	Match,
	Slug
} from '../attributes/AmmoAttrList'
import { Pierce, Scatter } from '../attributes/WeaponAttrList'


export const ArrowBroadhead = new Ammo({
	name: `Broadhead Arrow`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	cal: `Arrow`,
	attr: [
		Broadhead,
		Pierce,
	],
})

export const ArrowStandard = new Ammo({
	name: `Target Arrow`,
	desc: [
		`Practice arrow.`,
	],
	sz: 0.1,
	cal: `Arrow`,
})

export const Standard22 = new Ammo({
	name: `.22 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.005,
	cal: `.22`,
})

export const HollowPoint22 = new Ammo({
	name: `.22 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: .005,
	cal: `.22`,
	attr: [
		HollowPoint,
	],
})

export const Match22 = new Ammo({
	name: `.22 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.005,
	cal: `.22`,
	attr: [
		Match,
	],
})

export const Standard9mm = new Ammo({
	name: `9mm Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
})

export const HollowPoint9mm = new Ammo({
	name: `9mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
	attr: [
		HollowPoint,
	]
})

export const Match9mm = new Ammo({
	name: `9mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
	attr: [
		Match,
	]
})

export const Standard357 = new Ammo({
	name: `.357 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.01,
	cal: `.357`,
})

export const HollowPoint357 = new Ammo({
	name: `.357 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	cal: `.357`,
	attr: [
		HollowPoint,
	]
})

export const ArmorPiercing556 = new Ammo({
	name: `5.56mm Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		Pierce,
	]
})

export const Standard556 = new Ammo({
	name: `5.56mm Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
})

export const HollowPoint556 = new Ammo({
	name: `5.56mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		HollowPoint,
	]
})

export const Match556 = new Ammo({
	name: `5.56mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		Match,
	]
})

export const ArmorPiercing308 = new Ammo({
	name: `.308 Armor Piercing`,
	desc: [
		`Battlefield ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		Pierce,
	]
})

export const Standard308 = new Ammo({
	name: `.308 Standard`,
	desc: [
		`Basic ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
})

export const HollowPoint308 = new Ammo({
	name: `.308 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		HollowPoint,
	]
})

export const Match308 = new Ammo({
	name: `.308 Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		Match,
	]
})

export const Buckshot12g = new Ammo({
	name: `12g Buckshot`,
	desc: [
		`Scatter-shot ammunition.`,
	],
	sz: 0.05,
	cal: `12g`,
	attr: [
		Scatter,
	]
})

export const Slug12g = new Ammo({
	name: `12g Slug`,
	desc: [
		`Single-projectile ammunition.`,
	],
	sz: 0.05,
	cal: `12g`,
	attr: [
		Slug,
	]
})


export default [
	ArrowBroadhead,
	ArrowStandard,
	Standard22,
	HollowPoint22,
	Match22,
	Standard9mm,
	HollowPoint9mm,
	Match9mm,
	Standard357,
	HollowPoint357,
	ArmorPiercing556,
	Standard556,
	HollowPoint556,
	Match556,
	ArmorPiercing308,
	Standard308,
	HollowPoint308,
	Match308,
	Buckshot12g,
	Slug12g,
]


// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),