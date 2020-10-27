import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const Ruger1022 = new Gear({
	id: `94dc2629-a460-4bdc-a90f-0ade229af021`,
	name: `Ruger 10/22`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
	]
})
Ruger1022.dmg = 1
Ruger1022.rng = 30
Ruger1022.cap = 10
Ruger1022.cal = `.22`

export default Ruger1022