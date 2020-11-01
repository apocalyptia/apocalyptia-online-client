import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const RugerMkIII = new Gear({
	id: `739a925f-6d37-4e3f-a15d-af15248fbe1e`,
	name: `Ruger Mk.III Pistol`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid,
	]
})
RugerMkIII.dmg = 0
RugerMkIII.rng = 15
RugerMkIII.cap = 10
RugerMkIII.cal = `.22`

export default RugerMkIII