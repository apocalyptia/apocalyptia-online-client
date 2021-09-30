import Gear from '$classes/Gear.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Morningstar = new Gear({
	id: ``,
	name: `Morningstar`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		Pierce
	]
})
Morningstar.dmg = 3
Morningstar.rng = 2

export default Morningstar