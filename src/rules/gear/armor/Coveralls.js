import Armor from './Armor'
import Camo from '../attributes/armor/Camo'
import ColdResistance from '../attributes/armor/ColdResistance'


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