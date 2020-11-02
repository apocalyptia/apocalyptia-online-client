import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'
import Scatter from 'attributes/Scatter.js'

const StoegerCoachgun = new Gear({
	name: `Stoeger Coach Shotgun`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
})
StoegerCoachgun.dmg = 5
StoegerCoachgun.rng = 15
StoegerCoachgun.cap = 2
StoegerCoachgun.cal = `12g`

export default StoegerCoachgun