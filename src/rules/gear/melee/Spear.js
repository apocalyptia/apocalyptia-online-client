import Melee from '/src/classes/gear/Melee.js'
import OneHanded from '../attributes/OneHanded.js'
import Pierce from '../attributes/Pierce.js'

const Spear = new Melee({
	name: `Spear`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [OneHanded, Pierce]
})
Spear.dmg = 4
Spear.rng = 3

export default Spear
