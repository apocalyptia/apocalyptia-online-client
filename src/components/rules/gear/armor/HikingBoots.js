import Armor from '../../../classes/gear/Armor'
import ColdResistance from '../attributes/armor/ColdResistance'
import FireResistance from '../attributes/armor/FireResistance'


const HikingBoots = new Armor({
	name: `Hiking Boots`,
	sz: 2,
	dr: 1,
	loc: `Legs`,
	attr: [
		ColdResistance,
		FireResistance,
	]
})

export default HikingBoots