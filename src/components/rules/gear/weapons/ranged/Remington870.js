import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Scatter from 'attributes/Scatter.js'

const Remington870 = new Gear({
	id: `6398a22b-e4a9-4c9f-a984-3bf6aaa09146`,
	name: `Remington 870 Shotgun`,
	sz: 4,
	attr: [
		TwoHanded,
		Scatter,
	]
})
Remington870.dmg = 5
Remington870.rng = 15
Remington870.cap = 6
Remington870.cal = `12g`

export default Remington870