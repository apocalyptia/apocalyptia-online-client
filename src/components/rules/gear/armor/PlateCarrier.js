import Armor from '../../../classes/gear/Armor'
import Camo from '../attributes/armor/Camo'
import ColdResistance from '../attributes/armor/ColdResistance'
import FireResistance from '../attributes/armor/FireResistance'


const PlateCarrier = new Armor({
	name: `Plate Carrier`,
	sz: 4,
	dr: 4,
	loc: `Torso`,
	attr: [
		Camo,
		ColdResistance,
		FireResistance,
	]
})

export default PlateCarrier