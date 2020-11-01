import Gear from 'classes/Gear.js'
import Camo from 'attributes/Camo.js'
import ColdResistance from 'attributes/ColdResistance.js'

const GhillieSuit = new Gear({
	id: `6ec3af0b-27c8-4dde-b8b5-05a51633241b`,
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