import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const Crossbow = new Gear({
	id: `5f42d732-9acb-40b6-b74d-fc2e42e107c6`,
	name: `Crossbow`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
Crossbow.dmg = 2
Crossbow.rng = 15
Crossbow.cap = 1
Crossbow.cal = `Arrow`

export default Crossbow