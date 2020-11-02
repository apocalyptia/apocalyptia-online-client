import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const Glock17 = new Gear({
	name: `Glock 17 Pistol`,
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