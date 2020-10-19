import Armor from 'gear/armor/Armor.js'
import Camo from 'gear/attributes/armor/Camo.js'
import ColdResistance from 'gear/attributes/armor/ColdResistance.js'


const Coveralls = new Armor({
	id: `71ede3ad-c8a7-4556-86f1-c4037244757e`,
	name: `Coveralls`,
	sz: 3,
	dr: 1,
	loc: `Arms, Torso, Legs`,
	attr: [
		Camo,
		ColdResistance,
	]
})

export default Coveralls