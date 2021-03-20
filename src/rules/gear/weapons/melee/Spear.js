import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'
import Pierce from '/src/rules/gear/attributes/Pierce.js'

const Spear = new Gear({
	id: ``,
	name: `Spear`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		OneHanded,
		Pierce,
	]
})
Spear.dmg = 4
Spear.rng = 3

export default Spear