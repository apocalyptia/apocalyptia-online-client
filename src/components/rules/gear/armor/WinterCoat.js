import Gear from 'gear/Gear.js'
import ColdResistance from 'attributes/ColdResistance.js'

const WinterCoat = new Gear({
	id: `102e1133-3242-4a89-9658-e58aa5636e45`,
	name: `Winter Coat`,
	sz: 2,
	attr: [
		ColdResistance,
	],
	type: `Armor`
})
WinterCoat.dr = 1
WinterCoat.loc = `Arms, Torso`

export default WinterCoat