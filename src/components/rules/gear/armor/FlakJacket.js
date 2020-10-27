import Gear from 'gear/Gear.js'
import Camo from 'attributes/Camo.js'

const FlakJacket = new Gear({
	id: `31e3f366-1adf-4141-912d-0664c5644430`,
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