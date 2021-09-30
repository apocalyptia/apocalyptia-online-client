import Gear from '$classes/Gear.js'
import Blunt from '$rules/gear/attributes/Blunt.js'

const Staff = new Gear({
	id: ``,
	name: `Staff`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		Blunt,
	]
})
Staff.dmg = 3
Staff.rng = 3

export default Staff