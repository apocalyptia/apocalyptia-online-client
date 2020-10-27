import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'
import Scatter from 'attributes/Scatter.js'

const StoegerCoachgun = new Gear({
	id: `045bf20f-49ff-4fb5-b300-6088553c066d`,
	name: `Stoeger Coach Gun`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
})
StoegerCoachgun.dmg = 4
StoegerCoachgun.rng = 15
StoegerCoachgun.cap = 2
StoegerCoachgun.cal = `12g`

export default StoegerCoachgun