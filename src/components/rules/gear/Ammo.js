import { Gear, Attribute } from '../Gear'


class Ammo extends Gear {
	constructor({
		name,
		description,
		sz,
		cal,
		type
	}) {
		super({
			name,
			description,
			sz
		})
		this.cal = cal
		this.type = type
	}
}


export const ArrowBroadhead = new Ammo({
	name: `Broadhead Arrow`,
	description: `+1 DMG. Pierce.`,
	sz: 0.1,
	cal: `Arrow`,
	type: `Broadhead`
})

export const ArrowStandard = new Ammo({
	name: `Target Arrow`,
	description: `Basic ammo.`,
	sz: 0.1,
	cal: `Arrow`,
	type: `Standard`
})

export const Standard22 = new Ammo({
	name: `.22 Standard`,
	description: `Basic ammo.`,
	sz: 0.005,
	cal: `.22`,
	type: `Standard`
})

export const HollowPoint22 = new Ammo({
	name: `.22 Hollow Point`,
	description: `+1 DMG.`,
	sz: .005,
	cal: `.22`,
	type: `Hollow Point`
})

export const Match22 = new Ammo({
	name: `.22 Match`,
	description: `+1 RATK.`,
	sz: 0.005,
	cal: `.22`,
	type: `Match`
})

export const Standard9mm = new Ammo({
	name: `9mm Standard`,
	description: `Basic ammo.`,
	sz: 0.01,
	cal: `9mm`,
	type: `Standard`
})

export const HollowPoint9mm = new Ammo({
	name: `9mm Hollow Point`,
	description: `+1 DMG.`,
	sz: 0.01,
	cal: `9mm`,
	type: `Hollow Point`
})

export const Match9mm = new Ammo({
	name: `9mm Match`,
	description: `+1 RATK.`,
	sz: 0.01,
	cal: `9mm`,
	type: `Match`
})

export const Standard357 = new Ammo({
	name: `.357 Standard`,
	description: `Basic ammo.`,
	sz: 0.01,
	cal: `.357`,
	type: `Standard`
})

export const HollowPoint357 = new Ammo({
	name: `.357 Hollow Point`,
	description: `+1 DMG.`,
	sz: 0.01,
	cal: `.357`,
	type: `Hollow Point`
})

export const ArmorPiercing556 = new Ammo({
	name: `5.56mm Armor Piercing`,
	description: `Pierce.`,
	sz: 0.02,
	cal: `5.56`,
	type: `Armor Piercing`
})

export const Standard556 = new Ammo({
	name: `5.56mm Standard`,
	description: `Basic ammo.`,
	sz: 0.02,
	cal: `5.56`,
	type: `Standard`
})

export const HollowPoint556 = new Ammo({
	name: `5.56mm Hollow Point`,
	description: `+1 DMG.`,
	sz: 0.02,
	cal: `5.56`,
	type: `Hollow Point`
})

export const Match556 = new Ammo({
	name: `5.56mm Match`,
	description: `+1 RATK.`,
	sz: 0.02,
	cal: `5.56`,
	type: `Match`
})

export const ArmorPiercing308 = new Ammo({
	name: `.308 Armor Piercing`,
	description: `Pierce.`,
	sz: 0.02,
	cal: `.308`,
	type: `Armor Piercing`
})

export const Standard308 = new Ammo({
	name: `.308 Standard`,
	description: `Basic ammo.`,
	sz: 0.02,
	cal: `.308`,
	type: `Standard`
})

export const HollowPoint308 = new Ammo({
	name: `.308 Hollow Point`,
	description: `+1 DMG.`,
	sz: 0.02,
	cal: `.308`,
	type: `Hollow Point`
})

export const Match308 = new Ammo({
	name: `.308 Match`,
	description: `+1 RATK.`,
	sz: 0.02,
	cal: `.308`,
	type: `Match`
})

export const Buckshot12g = new Ammo({
	name: `12g Buckshot`,
	description: `Scatter.`,
	sz: 0.05,
	cal: `12g`,
	type: `Buckshot`
})

export const Slug12g = new Ammo({
	name: `12g Slug`,
	description: `RNG x2.`,
	sz: 0.05,
	cal: `12g`,
	type: `Slug`
})


export const AmmoList = [
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


class AmmoAttribute extends Attribute {
	constructor({
		name,
		description,
		calibers
	}) {
		super({
			name,
			description
		})
		this.calibers = calibers
	}
}

export const ArmorPiercing = new AmmoAttribute({
	name: 'Armor Piercing',
	description: [
		'Pierce.'
	],
	calibers: [
		'5.56',
		'.308'
	]
})

export const Broadhead = new AmmoAttribute({
	name: 'Broadhead',
	description: [
		'+1 DMG. Pierce'
	],
	calibers: [
		'Arrow'
	]
})

export const Buckshot = new AmmoAttribute({
	name: 'Buckshot',
	description: [
		'Scatter.'
	],
	calibers: [
		'12g'
	]
})

export const HollowPoint = new AmmoAttribute({
	name: 'Hollow Point',
	description: [
		'+1 DMG.'
	],
	calibers: [
		'.22',
		'9mm',
		'.357',
		'5.56',
		'.308',
		'12g'
	]
})

export const Match = new AmmoAttribute({
	name: 'Match',
	description: [
		'+1 RATK.'
	],
	calibers: [
		'.22',
		'9mm',
		'.357',
		'5.56',
		'.308'
	]
})

export const Slug = new AmmoAttribute({
	name: 'Slug',
	description: [
		'RNG x2.'
	],
	calibers: [
		'12g'
	]
})


export const AmmoAttributesList = [
	ArmorPiercing,
	Broadhead,
	Buckshot,
	HollowPoint,
	Match,
	Slug
]


// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RATK.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3FDMG/rnd for 3rnds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),