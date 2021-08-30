import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const GhillieSuit = new Armor({
	name: `Ghillie Suit`,
	size: 3,
	attributes: [ Camo, ColdResistance],
	type: `Armor`,
	absorption: 1,
	location: `Head, Arms, Torso, Legs`,
})

export default GhillieSuit
