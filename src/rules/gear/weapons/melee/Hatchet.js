import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'
import Chop from '/src/rules/gear/attributes/Chop.js'

const Hatchet = new Gear({
	id: ``,
	name: `Hatchet`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		OneHanded,
		Chop,
	]
})
Hatchet.dmg = 2
Hatchet.rng = 1

export default Hatchet