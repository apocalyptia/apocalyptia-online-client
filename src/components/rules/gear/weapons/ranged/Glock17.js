import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const Glock17 = new Gear({
	id: `5f42d732-9acb-40b6-b74d-fc2e42e107c6`,
	name: `Glock 17`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid,
	]
})
Glock17.dmg = 1
Glock17.rng = 10
Glock17.cap = 17
Glock17.cal = `9mm`

export default Glock17