import Gear from 'classes/Gear.js'
import ColdResistance from 'attributes/ColdResistance.js'
import FireResistance from 'attributes/FireResistance.js'

const HikingBoots = new Gear({
	id: `5cd1e496-431f-4eff-bd34-5e2b74ef06e9`,
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