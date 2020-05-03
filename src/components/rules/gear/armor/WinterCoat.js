import Armor from '../../../classes/gear/Armor'
import ColdResistance from '../attributes/armor/ColdResistance'


const WinterCoat = new Armor({
	name: `Winter Coat`,
	sz: 2,
	dr: 1,
	loc: `Arms, Torso`,
	attr: [
		ColdResistance,
	]
})

export default WinterCoat