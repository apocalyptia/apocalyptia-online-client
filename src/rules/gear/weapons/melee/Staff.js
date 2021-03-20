import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Blunt from '/src/rules/gear/attributes/Blunt.js'

const Staff = new Gear({
	id: ``,
	name: `Staff`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
})
Staff.dmg = 2
Staff.rng = 3

export default Staff