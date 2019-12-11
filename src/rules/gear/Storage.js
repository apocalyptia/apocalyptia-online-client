import Gear from './Gear.js'

class Storage extends Gear {
	constructor(name, slots, description, sz) {
		super(name, description, sz)
		this.slots = slots
	}
}

export const StorageList = [
	new Storage(`Backpack`,			 30, `2rnds to access.`,								 1),
	new Storage(`Bandoleer`,			1,  `Holds 50 bullets of any caliber.`,				 0),
	new Storage(`BDU Jacket`,		   4,  `Camo.`,											0),
	new Storage(`Cargo Pants`,		  6,  `Camo.`,											1),
	new Storage(`Canteen`,			  1,  `Holds 1 unit (.5gal) of liquid. Metal.`,		   1),
	new Storage(`Concealed Holster`,	1,  `Perception 12# to spot a Size 1 Gun.`,			 0),
	new Storage(`Cooler`,			   30, `Hunted or Foraged Food lasts 6 days.`,			 4),
	new Storage(`Duffel Bag`,		   40, `2rnds to access.`,								 3),
	new Storage(`Fuel Can`,			 5,  `5gal Fuel. d6FDMG/gal, 1min, 1yd/gal Blast.`,	  2),
	new Storage(`Hoody`,				2,  `CR.`,											  0),
	new Storage(`Hydration Pack`,	   4,  `Holds 4 units (2gal) of liquid.`,				  1),
	new Storage(`Lockbox`,			  1,  `10HP. 6DR. FR. Larceny(Disable) 9#.`,			  2),
	new Storage(`Messenger Bag`,		4,  `1rnd to access.`,								  2),
	new Storage(`Plastic Jug`,		  2,  `Holds 2 units (1gal) of liquid.`,				  1),
	new Storage(`Purse`,				3,  `1rnd to access.`,								  1),
	new Storage(`Speed-loader`,		 0,  `Reload a revolver cylinder as 1 action.`,		  0),
	new Storage(`Tool Belt`,			6,  `6x 1 Slots. +1 Build. Miscellaneous small tools.`, 2),
	new Storage(`Trench Coat`,		  4,  `CR. +1 Stealth.`,								  1),
	new Storage(`Water Bottle`,		 1,  `Holds 1 unit (.5gal) of liquid.`,				  1),
]

// TODO: Unit conversion still needs work.