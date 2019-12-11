import Gear from './Gear.js'

class MeleeWeapon extends Gear {
	constructor(name, dmg, hands, rng, description, sz) {
		super(name, description, sz)
		this.dmg = dmg
		this.hands = hands
		this.rng = rng
	}
}

export const MeleeList = [
	new MeleeWeapon(`Ax`,			   5, 2, 2, [`Slow`, `Chop`],		  4),
	new MeleeWeapon(`Baseball Bat`,	 3, 2, 2, [],						3),
	new MeleeWeapon(`Brass Knuckles`,   2, 1, 1, [`Unarmed`],			   1),
	new MeleeWeapon(`Crowbar`,		  3, 1, 2, [],						3),
	new MeleeWeapon(`Hammer`,		   2, 1, 1, [],						2),
	new MeleeWeapon(`Hatchet`,		  2, 1, 1, [`Chop`],				  2),
	new MeleeWeapon(`Knife`,			2, 1, 1, [`Pierce`, `Rapid`],	   1),
	new MeleeWeapon(`Machete`,		  3, 1, 2, [`Chop`],				  2),
	new MeleeWeapon(`Shield`,		   1, 1, 1, [`Cover 3DR`, `+3 Block`], 4),
	new MeleeWeapon(`Sledgehammer`,	 5, 2, 2, [`Slow`],				  5),
	new MeleeWeapon(`Spear`,			4, 2, 3, [`Pierce`],				3),
	new MeleeWeapon(`Staff`,			2, 2, 3, [],						3)
]

// RARE
// new MeleeWeapon(`Barbwire Club`, 3, 1, ``, 2),
// new MeleeWeapon(`Bowie Knife`, 2, 1, `Chop. Rapid.`, 1),
// new MeleeWeapon(`Broadsword`, 4, 2, `Chop or Pierce.`, 4),
// new MeleeWeapon(`Catch Pole`, 0, 2, `+1 Block. Blunt. +1 Grab.`, 3),
// new MeleeWeapon(`Chainsaw`, 6, 2, `.5gal Fuel. d6rnd start. 1: Empty. Loud.`, 4),
// new MeleeWeapon(`Ice Ax`, 3, 1, `Lever. Pierce.`, 2),
// new MeleeWeapon(`Katana`, 5, 2, `Chop or Pierce. Rapid.`, 3),
// new MeleeWeapon(`Kukri`, 3, 1, `Chop`, 2),
// new MeleeWeapon(`Lasso`, 0, 2, `Blunt. +1 Grab. Throw (RNG:3)`, 2),
// new MeleeWeapon(`Net`, 0, 2, `+6 Grab.`, 3),
// new MeleeWeapon(`Rapier`, 3, 1, `Pierce. Rapid.`, 2),
// new MeleeWeapon(`Scythe`, 6, 2, `Chop. Pierce.`, 4),
// new MeleeWeapon(`Sign Shield`, 2, 1, `+3 Block. Cover 6DR.`, 4),
// new MeleeWeapon(`Switchblade`, 1, 1, `Pierce. Rapid.`, 0),
// new MeleeWeapon(`Trench Knife`, 2, 1, `Blunt Punch. Pierce. Rapid.`, 1),
// new MeleeWeapon(`Whip`, 0, 1, `Blunt. +1 Disarm. +1 Grab. RNG:3.`, 1),

// OLD
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
// new MeleeWeapon(`Torch`, 1, 1, `Blunt. +1 FDMG. 5yd light radius 1hr.`, 2),