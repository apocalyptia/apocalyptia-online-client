import Gear from '/src/classes/Gear.js'
import Camo from '/src/rules/gear/attributes/Camo.js'
import ColdResistance from '/src/rules/gear/attributes/ColdResistance.js'

const Coveralls = new Gear({
	id: ``,
	name: `Coveralls`,
	sz: 3,
	attr: [
		Camo,
		ColdResistance,
	],
	type: `Armor`
})
Coveralls.dr = 1
Coveralls.loc = `Arms, Torso, Legs`

export default Coveralls