import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const BarnettCrossbow = new Gear({
	name: `Barnett Crossbow`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
BarnettCrossbow.dmg = 3
BarnettCrossbow.rng = 15
BarnettCrossbow.cap = 1
BarnettCrossbow.cal = `Arrow`

export default BarnettCrossbow