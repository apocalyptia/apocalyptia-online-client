import Gear from '../../../classes/Gear.js'
import Camo from '../../gear/attributes/Camo.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const GhillieSuit = new Gear({
	name: `Ghillie Suit`,
	sz: 3,
	attr: [Camo, ColdResistance],
	type: `Armor`
})
GhillieSuit.dr = 1
GhillieSuit.loc = `Full Body`

export default GhillieSuit
