import Gear from './Gear.js'

class Armor extends Gear {
	constructor(name, dr, loc, description, sz) {
		super(name, description, sz)
		this.dr = dr
		this.loc = loc
	}
}

export const ArmorList = [
	new Armor(`Athletic Helmet`,	1, `Head`,			  [],						 2),
	new Armor(`Athletic Pads`,	  1, `Torso`,			 [],						 2),
	new Armor(`Combat Helmet`,	  3, `Head`,			  [`Camo`],				   2),
	new Armor(`Coveralls`,		  1, `Arms, Torso, Legs`, [`Camo`, `CR`],			 3),
	new Armor(`Firefighter Suit`,   2, `Full Body`,		 [`CR`, `FR`, `Mask`],	   5),
	new Armor(`Flak Jacket`,		2, `Torso`,			 [`Camo`],				   4),
	new Armor(`Ghillie Suit`,	   1, `Full Body`,		 [`Camo`, `CR`],			 4),
	new Armor(`Hiking Boots`,	   1, `Legs`,			  [`CR`, `FR`],			   2),
	new Armor(`Kevlar Vest`,		3, `Torso`,			 [`CR`, `FR`],			   4),
	new Armor(`Leather Jacket`,	 1, `Arms, Torso`,	   [],						 2),
	new Armor(`Motorcycle Helmet`,  1, `Head`,			  [`FR`, `Mask`],			 2),
	new Armor(`Hazmat Suit`,		0, `Full Body`,		 [`Mask`, `Impermeable`],	2),
	new Armor(`Plate Carrier`,	  4, `Torso`,			 [`Camo`, `CR`, `FR`],	   4),
	new Armor(`Winter Coat`,		1, `Arms, Torso`,	   [`CR`],					 2),
	new Armor(`Work Gloves`,		1, `Arms`,			  [`FR`],					 1)
]

export const RandomArmor = function() {
	const randomRoll = Math.ceil(Math.random() * (ArmorList.length - 1))
	console.log(randomRoll)
	return ArmorList[randomRoll]
}

export const ArmorAttributes = [
	{ 'Camo':		   `+1 Stealth per Location when in a given Biome.` },
	{ 'CR':			 `Delay Hypothermia for 1 hour per Location.` },
	{ 'FR':			 `Armor DR reduces FDMG.` },
	{ 'Impermeable':	`Automatic Success to resist Diseases and Toxins.` },
	{ 'Mask':		   `Obscures identity and protects face. -1 Perception.` }
]

// OLD ARMOR
// new Armor(`Denim Jacket`, `1,1`, `Arms, Torso`, ``, 2)
// new Armor(`Interceptor Armor`, `3,6`, `Arms, Torso`, `Camo. CR. FR.`, 5)
// new Armor(`Kevlar Gloves`, `2`, `Arms`, `FR.`, 1)
// new Armor(`Knee Pads`, `1`, `Legs`, ``, 1)
// new Armor(`Paintball Mask`, `1`, `Head`, `Mask.`, 1)
// new Armor(`Riot Helmet`, `4`, `Head`, `FR. Mask.`, 2)
// new Armor(`Steel-Toe Boots`, `2`, `Legs`, `Blunt. FR. Kick 3BDMG`, 2)
// new Armor(`Tactical Vest`, `1`, `Torso`, `6 Storage.`, 1)
// new Armor(`Undercover Vest`, `3`, `Torso`, `FR.`, 3)

// RARE ARMOR
// new Armor(`Black Robe`, `1,1,1,1`, `Head, Torso, Arms, Legs`, `CR. +1 Stealth.`, 1)
// new Armor(`Chainmail Shirt`, `3,3,3`, `Head, Torso, Arms`, `Ignore Chop.`, 6)
// new Armor(`Dragonskin Vest`, `8`, `Torso`, `CR. FR.`, 3)
// new Armor(`Knuckle Gloves`, `2`, `Arms`, `2DMG Punch. Blunt. FR.`, 1)
// new Armor(`Land Warrior Helmet`, `4`, `Head`, `FR. Nightvision Goggles. Radio.`, 2)
// new Armor(`Spiked Jacket`, `2, 2`, `Torso, Arms`, `+1 DMG Grab.`, 3)