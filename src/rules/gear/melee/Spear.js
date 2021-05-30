import Gear from '../../../classes/Gear.js'
import OneHanded from '../attributes/OneHanded.js'
import Pierce from '../attributes/Pierce.js'

const Spear = new Gear({
	name: `Spear`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [OneHanded, Pierce]
})
Spear.dmg = 4
Spear.rng = 3

export default Spear
