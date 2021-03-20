import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Rapid from '/src/rules/gear/attributes/Rapid.js'
import Scatter from '/src/rules/gear/attributes/Scatter.js'

const StoegerCoachgun = new Gear({
	id: ``,
	name: `Stoeger Coach Shotgun`,
	type: `Ranged Weapon`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
})
StoegerCoachgun.dmg = 5
StoegerCoachgun.rng = 10
StoegerCoachgun.cap = 2
StoegerCoachgun.cal = `12g`

export default StoegerCoachgun