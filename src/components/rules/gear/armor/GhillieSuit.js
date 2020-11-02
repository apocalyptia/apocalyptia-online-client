import Gear from 'classes/Gear.js'
import Camo from 'attributes/Camo.js'
import ColdResistance from 'attributes/ColdResistance.js'

const GhillieSuit = new Gear({
	name: `Ghillie Suit`,
	sz: 4,
	attr: [
		Camo,
		ColdResistance,
	],
	type: `Armor`
})
GhillieSuit.dr = 1
GhillieSuit.loc = `Full Body`

export default GhillieSuit