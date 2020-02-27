import Ammo from '../../../classes/Ammo'
import {
	Broadhead,
	HollowPoint,
	Match,
	Slug
} from '../attributes/AmmoAttributesList'
import { Pierce, Scatter } from '../attributes/WeaponAttributesList'


export const ArrowBroadhead = new Ammo({
	name: `Broadhead Arrow`,
	sz: 0.1,
	cal: `Arrow`,
	attributes: [Broadhead, Pierce],
})

export const ArrowStandard = new Ammo({
	name: `Target Arrow`,
	sz: 0.1,
	cal: `Arrow`,
})

export const Standard22 = new Ammo({
	name: `.22 Standard`,
	sz: 0.005,
	cal: `.22`,
})

export const HollowPoint22 = new Ammo({
	name: `.22 Hollow Point`,
	sz: .005,
	cal: `.22`,
	attributes: [HollowPoint],
})

export const Match22 = new Ammo({
	name: `.22 Match`,
	sz: 0.005,
	cal: `.22`,
	attributes: [Match],
})

export const Standard9mm = new Ammo({
	name: `9mm Standard`,
	sz: 0.01,
	cal: `9mm`,
})

export const HollowPoint9mm = new Ammo({
	name: `9mm Hollow Point`,
	sz: 0.01,
	cal: `9mm`,
	attributes: [HollowPoint]
})

export const Match9mm = new Ammo({
	name: `9mm Match`,
	sz: 0.01,
	cal: `9mm`,
	attributes: [Match]
})

export const Standard357 = new Ammo({
	name: `.357 Standard`,
	sz: 0.01,
	cal: `.357`,
})

export const HollowPoint357 = new Ammo({
	name: `.357 Hollow Point`,
	sz: 0.01,
	cal: `.357`,
	attributes: [HollowPoint]
})

export const ArmorPiercing556 = new Ammo({
	name: `5.56mm Armor Piercing`,
	sz: 0.02,
	cal: `5.56`,
	attributes: [Pierce]
})

export const Standard556 = new Ammo({
	name: `5.56mm Standard`,
	sz: 0.02,
	cal: `5.56`,
})

export const HollowPoint556 = new Ammo({
	name: `5.56mm Hollow Point`,
	sz: 0.02,
	cal: `5.56`,
	attributes: [HollowPoint]
})

export const Match556 = new Ammo({
	name: `5.56mm Match`,
	sz: 0.02,
	cal: `5.56`,
	attributes: [Match]
})

export const ArmorPiercing308 = new Ammo({
	name: `.308 Armor Piercing`,
	sz: 0.02,
	cal: `.308`,
	attributes: [Pierce]
})

export const Standard308 = new Ammo({
	name: `.308 Standard`,
	sz: 0.02,
	cal: `.308`,
})

export const HollowPoint308 = new Ammo({
	name: `.308 Hollow Point`,
	sz: 0.02,
	cal: `.308`,
	attributes: [HollowPoint]
})

export const Match308 = new Ammo({
	name: `.308 Match`,
	sz: 0.02,
	cal: `.308`,
	attributes: [Match]
})

export const Buckshot12g = new Ammo({
	name: `12g Buckshot`,
	sz: 0.05,
	cal: `12g`,
	attributes: [Scatter]
})

export const Slug12g = new Ammo({
	name: `12g Slug`,
	sz: 0.05,
	cal: `12g`,
	attributes: [Slug]
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
	Match308,
	Buckshot12g,
	Slug12g
]


// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),