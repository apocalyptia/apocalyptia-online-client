import Armor from '$classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const Coveralls = new Armor({
	name: `Coveralls`,
	size: 3,
	attributes: [ Camo, ColdResistance],
	type: `Armor`,
	absorption: 1,
	location: `Arms, Torso, Legs`,
})

export default Coveralls
