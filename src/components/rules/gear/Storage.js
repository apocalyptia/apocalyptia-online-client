import { Gear } from '../Gear'


class Storage extends Gear {
	constructor(name, description, sz, slots) {
		super(name, description, sz)
		this.slots = slots
	}
}


export const Backpack = new Storage({
	name: `Backpack`,
	description: [
		`2rnds to access.`
	],
	sz: 1,
	slots: 30
})

export const Bandoleer = new Storage({
	name: `Bandoleer`,
	description: [
		`Holds 50 bullets of any caliber.`
	],
	sz: 0,
	slots: 1
})

export const BDUJacket = new Storage({
	name: `BDU Jacket`,
	description: [
		`Camo.`
	],
	sz: 0,
	slots: 4
})

export const CargoPants = new Storage({
	name: `Cargo Pants`,
	description: [
		`Camo.`
	],
	sz: 1,
	slots: 6
})

export const Canteen = new Storage({
	name: `Canteen`,
	description: [
		`Holds 1 unit (.5gal) of liquid. Metal.`
	],
	sz: 1,
	slots: 1
})

export const ConcealedHolster = new Storage({
	name: `Concealed Holster`,
	description: [
		`Perception 12# to spot a Size 1 Gun.`
	],
	sz: 0,
	slots: 1
})

export const Cooler = new Storage({
	name: `Cooler`,
	description: [
		`Hunted or Foraged Food lasts 6 days.`
	],
	sz: 4,
	slots: 30
})

export const DuffelBag = new Storage({
	name: `Duffel Bag`,
	description: [
		`2rnds to access.`
	],
	sz: 3,
	slots: 40
})

export const FuelCan = new Storage({
	name: `Fuel Can`,
	description: [
		`5gal Fuel. d6FDMG/gal, 1min, 1yd/gal Blast.`
	],
	sz: 2,
	slots: 5
})

export const Hoody = new Storage({
	name: `Hoody`,
	description: [
		`CR.`
	],
	sz: 0,
	slots: 2
})

export const HydrationPack = new Storage({
	name: `Hydration Pack`,
	description: [
		`Holds 4 units (2gal) of liquid.`
	],
	sz: 1,
	slots: 4
})

export const Lockbox = new Storage({
	name: `Lockbox`,
	description: [
		`10HP. 6DR. FR. Larceny(Disable) 9#.`
	],
	sz: 2,
	slots: 1
})

export const MessengerBag = new Storage({
	name: `Messenger Bag`,
	description: [
		`1rnd to access.`
	],
	sz: 2,
	slots: 4
})

export const PlasticJug = new Storage({
	name: `Plastic Jug`,
	description: [
		`Holds 2 units (1gal) of liquid.`
	],
	sz: 1,
	slots: 2
})

export const Purse = new Storage({
	name: `Purse`,
	description: [
		`1rnd to access.`
	],
	sz: 1,
	slots: 3
})

export const Speedloader = new Storage({
	name: `Speed-loader`,
	description: [
		`Reload a revolver cylinder as 1 action.`
	],
	sz: 0,
	slots: 0
})

export const ToolBelt = new Storage({
	name: `Tool Belt`,
	description: [
		`6x 1 Slots. +1 Build. Miscellaneous small tools.`
	],
	sz: 2,
	slots: 6
})

export const TrenchCoat = new Storage({
	name: `Trench Coat`,
	description: [
		`CR. +1 Stealth.`
	],
	sz: 1,
	slots: 4
})

export const WaterBottle = new Storage({
	name: `Water Bottle`,
	description: [
		`Holds 1 unit (.5gal) of liquid.`
	],
	sz: 1,
	slots: 1
})


export const StorageList = [
	Backpack,
	Bandoleer,
	BDUJacket,
	CargoPants,
	Canteen,
	ConcealedHolster,
	Cooler,
	DuffelBag,
	FuelCan,
	Hoody,
	HydrationPack,
	Lockbox,
	MessengerBag,
	PlasticJug,
	Purse,
	Speedloader,
	ToolBelt,
	TrenchCoat,
	WaterBottle
]