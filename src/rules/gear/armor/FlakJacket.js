import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'

const FlakJacket = new Armor({
	name: `Flak Jacket`,
	sz: 3,
	attr: [Camo],
	type: `Armor`
})
FlakJacket.dr = 2
FlakJacket.loc = `Torso`

export default FlakJacket
