import Armor from '../../../classes/gear/Armor'
import Camo from '../attributes/armor/Camo'
import ColdResistance from '../attributes/armor/ColdResistance'


const GhillieSuit = new Armor({
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