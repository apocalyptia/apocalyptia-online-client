import Gear from 'classes/Gear.js'
import Camo from 'attributes/Camo.js'
import ColdResistance from 'attributes/ColdResistance.js'

const Coveralls = new Gear({
	id: `71ede3ad-c8a7-4556-86f1-c4037244757e`,
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