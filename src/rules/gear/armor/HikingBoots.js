import Gear from '../../../classes/Gear.js' 
import ColdResistance from '../../gear/attributes/ColdResistance.js' 
import FireResistance from '../../gear/attributes/FireResistance.js' 

const HikingBoots = new Gear({
	name: `Hiking Boots`,
	sz: 2,
	attr: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
})
HikingBoots.dr = 1
HikingBoots.loc = `Legs`

export default HikingBoots