import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const GhillieSuit = new Armor({
	name: `Ghillie Suit`,
	sz: 3,
	attr: [Camo, ColdResistance],
	type: `Armor`
})
GhillieSuit.dr = 1
GhillieSuit.loc = `Full Body`

export default GhillieSuit
