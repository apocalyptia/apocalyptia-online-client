import Gear from '/src/classes/Gear.js'
import Camo from '/src/rules/gear/attributes/Camo.js'
import ColdResistance from '/src/rules/gear/attributes/ColdResistance.js'

const GhillieSuit = new Gear({
	id: ``,
	name: `Ghillie Suit`,
	sz: 3,
	attr: [
		Camo,
		ColdResistance,
	],
	type: `Armor`
})
GhillieSuit.dr = 1
GhillieSuit.loc = `Full Body`

export default GhillieSuit