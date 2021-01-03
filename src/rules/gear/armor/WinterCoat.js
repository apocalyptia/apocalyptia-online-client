import Gear from 'classes/Gear.js'
import ColdResistance from 'rules/gear/attributes/ColdResistance.js'

const WinterCoat = new Gear({
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