import Armor from './Armor'
import Camo from '../attributes/armor/Camo'
import ColdResistance from '../attributes/armor/ColdResistance'
import FireResistance from '../attributes/armor/FireResistance'


const PlateCarrier = new Armor({
	id: `6734c9c6-d9b0-4e3d-b455-6db395645014`,
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