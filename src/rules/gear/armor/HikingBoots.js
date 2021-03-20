import Gear from '/src/classes/Gear.js'
import ColdResistance from '/src/rules/gear/attributes/ColdResistance.js'
import FireResistance from '/src/rules/gear/attributes/FireResistance.js'

const HikingBoots = new Gear({
	id: ``,
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