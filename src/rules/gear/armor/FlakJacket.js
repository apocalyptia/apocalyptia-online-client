import Gear from 'classes/Gear.js'
import Camo from 'rules/gear/attributes/Camo.js'

const FlakJacket = new Gear({
	id: ``,
	name: `Flak Jacket`,
	sz: 4,
	attr: [
		Camo,
	],
	type: `Armor`
})
FlakJacket.dr = 2
FlakJacket.loc = `Torso`

export default FlakJacket