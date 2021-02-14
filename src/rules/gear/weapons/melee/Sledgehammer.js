import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'
import Blunt from 'rules/gear/attributes/Blunt.js'
import Slow from 'rules/gear/attributes/Slow.js'

const Sledgehammer = new Gear({
	id: ``,
	name: `Sledgehammer`,
	type: `Melee Weapon`,
	sz: 5,
	attr: [
		TwoHanded,
		Blunt,
		Slow,
	]
})
Sledgehammer.dmg = 4
Sledgehammer.rng = 2

export default Sledgehammer