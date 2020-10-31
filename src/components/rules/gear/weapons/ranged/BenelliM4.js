import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'
import Scatter from 'attributes/Scatter.js'

const BenelliM4 = new Gear({
	id: `00b5ce6e-ce91-4a68-856e-f72538af0261`,
	name: `Benelli M4 Shotgun`,
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