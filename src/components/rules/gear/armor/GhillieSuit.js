import Armor from 'gear/armor/Armor.js'
import Camo from 'gear/attributes/armor/Camo.js'
import ColdResistance from 'gear/attributes/armor/ColdResistance.js'


const GhillieSuit = new Armor({
	id: `6ec3af0b-27c8-4dde-b8b5-05a51633241b`,
	name: `Ghillie Suit`,
	sz: 4,
	dr: 1,
	loc: `Full Body`,
	attr: [
		Camo,
		ColdResistance,
	]
})

export default GhillieSuit