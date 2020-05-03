import Armor from '../../../classes/gear/Armor'
import Camo from '../attributes/armor/Camo'


const FlakJacket = new Armor({
	name: `Flak Jacket`,
	sz: 4,
	dr: 2,
	loc: `Torso`,
	attr: [
		Camo,
	]
})

export default Camo