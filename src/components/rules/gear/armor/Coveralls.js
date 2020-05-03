import Armor from '../../../classes/gear/Armor'
import Camo from '../attributes/armor/Camo'
import ColdResistance from '../attributes/armor/ColdResistance'


const Coveralls = new Armor({
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