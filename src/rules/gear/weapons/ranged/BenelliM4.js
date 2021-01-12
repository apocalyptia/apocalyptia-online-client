import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'
import Rapid from 'rules/gear/attributes/Rapid.js'
import Scatter from 'rules/gear/attributes/Scatter.js'

const BenelliM4 = new Gear({
	id: ``,
	name: `Benelli M4 Shotgun`,
	type: `Ranged Weapon`,
	sz: 4,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
})
BenelliM4.dmg = 5
BenelliM4.rng = 15
BenelliM4.cap = 6
BenelliM4.cal = `12g`

export default BenelliM4