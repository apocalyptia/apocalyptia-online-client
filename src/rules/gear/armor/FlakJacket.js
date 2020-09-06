import Armor from './Armor'
import Camo from '../attributes/armor/Camo'


const FlakJacket = new Armor({
	id: `31e3f366-1adf-4141-912d-0664c5644430`,
	name: `Flak Jacket`,
	sz: 4,
	dr: 2,
	loc: `Torso`,
	attr: [
		Camo,
	]
})

export default Camo