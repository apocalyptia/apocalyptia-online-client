import Gear from 'classes/Gear.js'
import ColdResistance from 'attributes/ColdResistance.js'
import FireResistance from 'attributes/FireResistance.js'

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