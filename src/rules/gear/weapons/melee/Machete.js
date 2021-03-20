import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'
import Chop from '/src/rules/gear/attributes/Chop.js'

const Machete = new Gear({
	id: ``,
	name: `Machete`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		OneHanded,
		Chop,
	]
})
Machete.dmg = 3
Machete.rng = 2

export default Machete