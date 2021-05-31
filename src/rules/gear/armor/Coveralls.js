import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const Coveralls = new Armor({
	name: `Coveralls`,
	sz: 3,
	attr: [Camo, ColdResistance],
	type: `Armor`
})
Coveralls.dr = 1
Coveralls.loc = `Arms, Torso, Legs`

export default Coveralls
