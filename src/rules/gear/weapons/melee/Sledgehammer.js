import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Blunt from '/src/rules/gear/attributes/Blunt.js'
import Slow from '/src/rules/gear/attributes/Slow.js'

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