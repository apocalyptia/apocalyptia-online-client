import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const Crossbow = new Gear({
	name: `Crossbow`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
Crossbow.dmg = 3
Crossbow.rng = 15
Crossbow.cap = 1
Crossbow.cal = `Arrow`

export default Crossbow