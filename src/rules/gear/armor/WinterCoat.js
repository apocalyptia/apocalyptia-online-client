import Armor from './Armor'
import ColdResistance from '../attributes/armor/ColdResistance'


const WinterCoat = new Armor({
	id: `102e1133-3242-4a89-9658-e58aa5636e45`,
	name: `Winter Coat`,
	sz: 2,
	dr: 1,
	loc: `Arms, Torso`,
	attr: [
		ColdResistance,
	]
})

export default WinterCoat