import Gear from '$classes/Gear.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Spear = new Gear({
	id: ``,
	name: `Spear`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		Pierce,
	]
})
Spear.dmg = 3
Spear.rng = 4

export default Spear