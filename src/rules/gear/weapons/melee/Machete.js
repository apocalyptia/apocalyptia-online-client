import Gear from 'classes/Gear.js'
import OneHanded from 'rules/gear/attributes/OneHanded.js'
import Chop from 'rules/gear/attributes/Chop.js'

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