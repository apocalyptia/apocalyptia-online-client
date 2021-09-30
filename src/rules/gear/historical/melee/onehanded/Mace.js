import Gear from '$classes/Gear.js'

const Mace = new Gear({
	id: ``,
	name: `Mace`,
	type: `Melee Weapon`,
	sz: 3,
	attr: []
})
Mace.dmg = 3
Mace.rng = 2

export default Mace