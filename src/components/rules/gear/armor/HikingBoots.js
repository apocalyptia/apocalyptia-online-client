import Armor from 'gear/armor/Armor.js'
import ColdResistance from 'gear/attributes/armor/ColdResistance.js'
import FireResistance from 'gear/attributes/armor/FireResistance.js'


const HikingBoots = new Armor({
	id: `5cd1e496-431f-4eff-bd34-5e2b74ef06e9`,
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