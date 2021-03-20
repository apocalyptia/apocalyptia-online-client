import Gear from '/src/classes/Gear.js'
import ColdResistance from '/src/rules/gear/attributes/ColdResistance.js'

const WinterCoat = new Gear({
	id: ``,
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